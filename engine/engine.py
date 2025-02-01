import torch
import transformers
import torch.nn as nn
import re
import nltk
from nltk.corpus import stopwords

class Model(nn.Module):
    def __init__(self):
        nltk.download('stopwords')
        self.solidity_stopwords = ["pragma", "interface", "contract", "function", "event", "modifier", "library", "using",
                                   "string", "uint8", "uint256", "address", "mapping", "bool", "require", "return", "memory",
                                   "storage", "public", "internal", "view", "returns", "constant", "constructor",
                                   "_owner", "_balances", "_allowances", "_founder", "_marketing", "_who", "_burntAmount",
                                   "_from", "_to", "_value", "_timestamp", "_bool", "msg.sender", "totalSupply",
                                   "balanceOf", "transfer", "allowance", "approve", "transferFrom", "add", "sub", "mul", "div",
                                   "mod", "changeFounder", "setMinter", "setFurnace", "freezeAccount","solidity","bytes32"]
        self.tokenizer = transformers.AutoTokenizer.from_pretrained('bert-base-uncased')
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        self.num_models = 8
        self.models = []

        for i in range(self.num_models):
            model = transformers.AutoModelForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
            state_dict = torch.load(f'trained/model_{i}.pth', map_location=torch.device(self.device))
            new_state_dict = {}
            for k, v in state_dict.items():
                new_key = k[7:] if k.startswith('module.') else k  # Remove 'module.' prefix if it exists
                new_state_dict[new_key] = v
            model.load_state_dict(new_state_dict)
            model.to(self.device)
            self.models.append(model)

    def get_clean_solidity_code(self, solidity_code):
        # Remove comments (both single-line and multi-line)
        cleaned_code = re.sub(r'//.*?$', '', solidity_code, flags=re.MULTILINE)
        cleaned_code = re.sub(r'/\*.*?\*/', '', cleaned_code, flags=re.DOTALL)

        # Remove special characters and punctuation
        cleaned_code = re.sub(r'[^a-zA-Z0-9\s]', '', cleaned_code)

        # Remove extra whitespace and blank lines, and convert to lowercase
        cleaned_code = '\n'.join(line.strip().lower() for line in cleaned_code.splitlines() if line.strip())

        # Remove common English stop words
        stop_words = set(stopwords.words('english'))
        tokens = [word for word in cleaned_code.split() if word not in stop_words]
        tokens = [token for token in tokens if token not in self.solidity_stopwords]
        cleaned_code = ' '.join(tokens)

        return cleaned_code
    
    def get_tokens(self, clean_solidity_code):
        encoded_dict = self.tokenizer.encode_plus(clean_solidity_code, add_special_tokens=True, padding='max_length', truncation=True,
                                              return_attention_mask=True, return_tensors='pt')
        input_id = encoded_dict['input_ids'].to(self.device)
        attention_mask = encoded_dict['attention_mask'].to(self.device)

        return input_id, attention_mask
    
    def get_num_vulnerabilities(self, solidity_code):
        clean_solidity_code = self.get_clean_solidity_code(solidity_code)
        print(clean_solidity_code)
        input_id, attention_mask = self.get_tokens(clean_solidity_code)
        
        probs = []

        for model in self.models:
            logits = model(input_id, attention_mask).logits
            prob = torch.nn.functional.softmax(logits)[0][1].item()
            probs.append(prob)

        return probs