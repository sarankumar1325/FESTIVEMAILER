# FestiveMailer 🎉

https://github.com/user-attachments/assets/3bf5e7f6-c809-42fc-930d-bb9da65ebc8b

FestiveMailer is a modern web application that helps users craft personalized festival greeting emails with AI assistance. Simply select a festival, fill in recipient details, choose your tone, and let the AI create the perfect festive message.

## Features

- **Festival-Themed Messages** - Create greetings for Diwali, Christmas, New Year, Eid, Holi, and more
- **Multi-Step Flow** - Create, preview, and send workflow for better control
- **Customizable Tone** - Choose from Warm & Personal, Formal & Professional, Fun & Lighthearted, or Spiritual & Reflective
- **Festival Theming** - Dynamic colors and styling that match the selected festival
- **AI-Powered Generation** - Leverages Lyzr AI Agent to craft personalized messages
- **Gmail Integration** - Direct email sending through connected Gmail account
- **Modern UI** - Clean, responsive interface built with React and TailwindCSS

## Screens & Flow

1. **Create Message** - Festival selection, recipient details, tone selection, and personal touches
2. **Preview Email** - Review AI-generated subject and body before sending  
3. **Success Confirmation** - Confirmation screen with option to send another message

## Tech Stack

- Frontend: React 18, TypeScript
- Styling: TailwindCSS
- Build Tool: Vite
- Icons: Lucide React
- AI Integration: Lyzr AI Studio Agent
- Email Service: Gmail API (via Lyzr Agent)

## API Configuration

The app integrates with Lyzr AI Studio Agent:
- **Endpoint**: `Configured via environment variables
- **Agent ID**: Configured via environment variables
- **API Key**: Configured via environment variables

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_API_URL=https://agent-prod.studio.lyzr.ai/v3/inference/chat/
VITE_API_KEY=your_api_key_here
VITE_USER_ID=your_user_id_here
VITE_AGENT_ID=683a7619883e43f5a295739f
VITE_SESSION_ID=your_session_id_here
```

## Quick Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd FestiveMailer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Add your Lyzr API credentials

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Festival Support

Currently supports:
- **Diwali** - Amber/gold theming
- **Christmas** - Green/red theming  
- **New Year** - Blue/purple theming
- **Eid** - Emerald/teal theming
- **Holi** - Rainbow/pink theming
- **Other** - Generic gray theming

## Usage

1. Select a festival from the available options
2. Enter recipient name and email address
3. Specify your relationship context (optional)
4. Choose the desired tone for the message
5. Add any additional personal touches
6. Enter your name as the sender
7. Click "Generate & Preview" to see the AI-generated message
8. Review and click "Send Now" to deliver the email
9. Get confirmation that your festive greeting has been sent!


   
