import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PersonalizedCampaigns } from "./personalized-campaigns";
import { Chatbot } from "./chatbot";
import { MessageCircle, X } from "lucide-react";

export function SidebarContent() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <Card className="w-[450px] h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-xl font-bold">Kişisel Alan</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden relative p-0 flex flex-col">
        <div
          className={`transition-all duration-300 ease-in-out ${
            showChatbot ? "h-1/2" : "h-full"
          } overflow-auto`}
        >
          <PersonalizedCampaigns />
        </div>
        <div
          className={`transition-all duration-300 ease-in-out ${
            showChatbot ? "h-1/2" : "h-0"
          } overflow-hidden`}
        >
          <Chatbot />
        </div>
      </CardContent>
      <div className="p-4 border-t">
        <Button
          onClick={() => setShowChatbot(!showChatbot)}
          className="w-full bg-kfs hover:bg-kfshover/90 text-white"
        >
          {showChatbot ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Chatbot'u Kapat
            </>
          ) : (
            <>
              <MessageCircle className="w-4 h-4 mr-2" />
              Chatbot'u Aç
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
