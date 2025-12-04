import * as React from "react"
import { Mail } from "@/components/mail"
import { Email } from "@/types"
import { useSocket } from "@/hooks/use-socket"

export default function Page() {
  const layout = [20, 32, 48]
  const collapsed = false
  const { socket, isConnected } = useSocket()

  const [mails, setMails] = React.useState<Email[]>([
    {
      id: "1",
      thread_id: "t1",
      user_id: "u1",
      sender_name: "William Smith",
      sender_email: "williamsmith@example.com",
      recipient_emails: ["me@example.com"],
      subject: "Meeting Tomorrow",
      snippet: "Hi, let's meet tomorrow to discuss the project. I've attached the agenda for your review.",
      body_text: "Hi,\n\nLet's meet tomorrow to discuss the project. I've attached the agenda for your review.\n\nBest,\nWilliam",
      date: new Date().toISOString(),
      is_read: false,
      is_starred: true,
      is_draft: false,
      labels: [{ id: "l1", name: "work", type: "user", color: "#000" }],
    },
    {
      id: "2",
      thread_id: "t2",
      user_id: "u1",
      sender_name: "Alice Smith",
      sender_email: "alicesmith@example.com",
      recipient_emails: ["me@example.com"],
      subject: "Re: Project Update",
      snippet: "Thank you for the project update. It looks great! I have a few questions about the timeline.",
      body_text: "Thank you for the project update. It looks great!\n\nI have a few questions about the timeline. Can we hop on a quick call?\n\nThanks,\nAlice",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      is_read: true,
      is_starred: false,
      is_draft: false,
      labels: [{ id: "l2", name: "personal", type: "user", color: "#000" }],
    },
    {
      id: "3",
      thread_id: "t3",
      user_id: "u1",
      sender_name: "Bob Johnson",
      sender_email: "bobjohnson@example.com",
      recipient_emails: ["me@example.com"],
      subject: "Weekend Plans",
      snippet: "Hey, are you free this weekend? We are planning a hiking trip.",
      body_text: "Hey,\n\nAre you free this weekend? We are planning a hiking trip to the mountains.\n\nLet me know if you want to join!\n\nBob",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      is_read: true,
      is_starred: false,
      is_draft: false,
      labels: [],
    }
  ])

  React.useEffect(() => {
    if (!socket) return

    socket.on("new-email", (newEmail: Email) => {
      setMails((prev) => [newEmail, ...prev])
    })

    return () => {
      socket.off("new-email")
    }
  }, [socket])

  return (
    <div className="flex-col md:flex">
      <div className="hidden">Status: {isConnected ? "Connected" : "Disconnected"}</div>
      <Mail
        mails={mails}
        defaultLayout={layout}
        defaultCollapsed={collapsed}
        navCollapsedSize={4}
      />
    </div>
  )
}
