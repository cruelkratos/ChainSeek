"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const teamMembers = [
    {
        name: "Garv Sethi",
        role: "Full Stack Developer",
        description: "Passionate about building scalable web3 applications and optimizing system performance.",
        image: "https://wallpapersok.com/images/hd/kanye-west-bear-floating-above-mountains-japanese-characters-hzm080o8jprvaica.jpg"
    },
    {
        name: "Mmukuk Khedekar",
        role: "Blockchain and Security Engineer",
        description: "Specialized in decentralized applications and smart contract vulnerabilities.",
        image: "https://userpic.codeforces.org/2757333/title/e11c599fbcb199ee.jpg"
    },
    {
        name: "Kunal Bansal",
        role: "Machine Learning Engineer",
        description: "Focused on AI-driven solutions to enhance user experience and efficiency.",
        image: "https://wallpapers.com/images/high/sad-gojo-satoru-ge11u23sui7b82sm.webp"
    },
    {
        name: "Granth Gaud",
        role: "UI/UX Designer and Frontend Engineer",
        description: "Dedicated to crafting intuitive and engaging user interfaces for seamless interactions.",
        image: "https://i.imgur.com/89hW6z6.png"
    }
]

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-6 text-gradient">Meet Our Hackathon Team</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    We are a team of passionate developers and designers working together to build innovative solutions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {teamMembers.map((member, index) => (
                        <Card key={index} className="border border-gray-800 bg-card purple-gradient">
                            <CardHeader className="flex items-center space-x-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={member.image} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-white">{member.name}</CardTitle>
                                    <CardDescription className="text-gray-400">{member.role}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="text-gray-300">
                                {member.description}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutPage
