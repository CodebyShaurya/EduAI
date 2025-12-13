# Prompts for Different Models

Below is the collection of prompts grouped according to which model they should be given to. Each prompt is presented with a clear heading, properly formatted text, and easy readability.

---

## **1. Prompt for Bolt**

### **Prompt**
Create an edtechAI platform that doesn't give straight answers but takes input from users, understands their current understanding of the topic, then proceeds by asking relevant questions and giving guided answers.

The platform should be built in **Next.js** with **Tailwind CSS**, and it must call the **Gemini API** for the chatbot. The interface should look similar to ChatGPT, but the homepage must be different. Implement Google login, and include a chat option inside a dedicated chat section.

The chat window should initially appear vertically centered for the first interaction. After the first chat exchange, the layout should switch to a normal AI chat format with input and output stacking naturally. When conversation messages are present, the input bar must always appear at the bottom.

Add a sidebar to display previous chats, and add the ability to hide the sidebar on small screens. Implement Gemini API on the backend and add Google Auth for login and sign-up.

Before answering any topic, the AI must ask **2–3 questions** to understand the user’s existing knowledge. After the questions, the AI should answer based on the user’s understanding and previous answers, promoting conceptual clarity rather than rote learning.

Remove the dialogue box style from AI responses. Improve the UI so headings are bold and the response content stays centered with `max-w-6xl mx-auto`.

Improve the homepage UI to look techy, add a comparison between EduAI and GPT learning, show testimonials, and use Tailwind color variables.

The response formatting should:
- Include a separate section for questions at the top
- Use bold headings
- Keep text left aligned
- Start each line from a new line
- Stop after 3 questions and proceed with an understanding‑based explanation

**To:** Bolt

---

## **2. Prompt for Amazon Q (First Prompt)**

### **Prompt**
Implement the controlled Socratic‑style teaching flow for the edtechAI chatbot. The chatbot should:

- Ask exactly **2–3 structured questions** about the user’s topic.
- Evaluate user answers to gauge understanding.
- Provide a structured, layered explanation based on the user’s responses.
- Avoid dumping direct answers.
- Encourage reasoning and concept building.
- Use the follow‑up responses+context to shape further explanations.

Ensure the response formatting follows:
- A dedicated **“Questions”** section
- Bold headings
- Left‑aligned text
- Line breaks after every line

**To:** Amazon Q

---

## **3. Prompt for Amazon Q (Second Prompt)**

### **Prompt**
Design backend logic for:
- Capturing the user’s topic
- Generating 2–3 diagnostic questions
- Storing user answers
- Passing the topic + answers to Gemini for context‑aware reasoning
- Returning a teacher‑style guided explanation

Make the backend modular so it can:
- Store previous chats
- Fetch context for follow‑up queries
- Maintain user understanding progression

**To:** Amazon Q

---

## **4. Prompt for GitHub Copilot (First Prompt)**

### **Prompt**
Generate Next.js + Tailwind CSS code for:
- Chat interface similar to ChatGPT
- Centered first‑message layout
- Input bar fixed at bottom when messages exist
- Sidebar with previous chats
- Collapsible sidebar for mobile
- Google Auth integration using NextAuth
- Gemini API proxy route in `/api/chat`
- Message display with bold headings, left alignment, and `max-w-6xl mx-auto`

Ensure components are reusable and cleanly structured.

**To:** GitHub Copilot

---

## **5. Prompt for GitHub Copilot (Second Prompt)**

### **Prompt**
Create the homepage UI with:
- A tech‑themed hero section
- Comparison block: **EduAI vs GPT‑Learning**
- Testimonials carousel
- Tailwind color variables
- Clean, modern layout consistent with the chat page

Ensure the overall design maintains a sleek, professional, futuristic look.

**To:** GitHub Copilot

