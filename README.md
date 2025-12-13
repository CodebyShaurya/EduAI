# EduAI - AI-Powered Socratic Learning Platform

EduAI is a revolutionary educational platform that leverages advanced AI technology to provide personalized learning experiences using the Socratic method. By guiding students through thoughtful questions and feedback, EduAI helps build critical thinking skills and deep understanding.

## Features

- **Socratic Method**: Encourages learning through guided discovery rather than direct answers.
- **AI-Powered Feedback**: Provides detailed feedback on answers, including correctness, strengths, and areas for improvement.
- **Interactive Chat Interface**: Engage with an AI tutor in a user-friendly chat environment.
- **Personalized Learning**: Adapts to the user's level and learning pace.
- **Comprehensive Summaries**: Generates summaries of learning sessions for review and further study.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Google Generative AI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CodebyShaurya/EduAI.git
   ```
2. Navigate to the project directory:
   ```bash
   cd EduAI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your Google Generative AI API key:
   ```env
   GOOGLE_AI_API_KEY=your_api_key_here
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `app/`: Contains the Next.js application files.
- `components/`: Reusable React components for the UI.
- `lib/`: Utility functions and API integrations.
- `public/`: Static assets like images and icons.

## Deployment

EduAI can be deployed to platforms like Vercel, Netlify, or any Node.js-compatible hosting service. Ensure that your environment variables are properly configured in the hosting platform.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact the EduAI team at [support@eduai.app](mailto:support@eduai.app).