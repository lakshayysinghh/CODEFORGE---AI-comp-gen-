import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Select from 'react-select';
import { BsStars } from 'react-icons/bs';
import { HiOutlineCode } from 'react-icons/hi';
import Editor from '@monaco-editor/react';
import { IoCloseSharp, IoCopy } from 'react-icons/io5';
import { PiExportBold } from 'react-icons/pi';
import { ImNewTab } from 'react-icons/im';
import { FiRefreshCcw, FiGithub } from 'react-icons/fi';
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const Home = () => {

  const options = [
    { value: 'html-css', label: 'HTML + CSS' },
    { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
    { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
    { value: 'html-css-js', label: 'HTML + CSS + JS' },
    { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap' },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFrameWork] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCEKqHG0JUSxm4BerLBJWG2CTZAKuiVsEo"
  });

  async function getResponse() {
    if (!prompt.trim()) {
      toast.error("Please describe your component first");
      return;
    }

    try {
      setLoading(true);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
     You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${frameWork.value}  

Requirements:  
- The code must be clean, well-structured, and easy to understand.  
- Optimize for SEO where applicable.  
- Focus on creating a modern, animated, and responsive UI design.  
- Include high-quality hover effects, shadows, animations, colors, and typography.  
- Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
- Do NOT include explanations, text, comments, or anything else besides the code.  
- And give the whole code in a single HTML file.
      `,
      });

      const generatedCode = extractCode(response.text);
      setCode(generatedCode);
      setOutputScreen(true);
      setTab(1);
      toast.success("Code generated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while generating code");
    } finally {
      setLoading(false);
    }
  }

  const copyCode = async () => {
    if (!code.trim()) {
      toast.error("No code to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy");
    }
  };

  const downnloadFile = () => {
    if (!code.trim()) {
      toast.error("No code to download");
      return;
    }

    const fileName = "GenUI-Code.html";
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded successfully");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />

      {/* GitHub Link */}
      <div className="flex items-center justify-center mt-8">
        <a 
          href="YOUR_GITHUB_REPO_URL" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-400 hover:text-white transition-colors group"
        >
          <FiGithub className="text-base" />
          <span className="text-xs font-medium">Source on GitHub</span>
        </a>
      </div>

      {/* Main Generator Section */}
      <div id="generator" className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 lg:px-12 mt-6 mb-12">
        {/* Left Section */}
        <div className="w-full py-6 rounded-lg bg-[#0a0a0a] px-5 border border-zinc-900">
          <h3 className='text-xl font-medium text-white'>AI Component Generator</h3>
          <p className='text-gray-500 mt-1 text-sm'>Describe your component and let AI code it.</p>

          <p className='text-xs font-medium mt-6 text-gray-400 uppercase tracking-wide'>Framework</p>
          <Select
            className='mt-2'
            options={options}
            value={frameWork}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#000",
                borderColor: "#18181b",
                color: "#fff",
                boxShadow: "none",
                minHeight: "38px",
                fontSize: "14px",
                "&:hover": { borderColor: "#27272a" }
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#000",
                color: "#fff",
                border: "1px solid #18181b"
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#7c3aed"
                  : state.isFocused
                    ? "#18181b"
                    : "#000",
                color: "#fff",
                fontSize: "14px",
                cursor: "pointer",
                "&:active": { backgroundColor: "#6d28d9" }
              }),
              singleValue: (base) => ({ ...base, color: "#e4e4e7" }),
              placeholder: (base) => ({ ...base, color: "#52525b" }),
              input: (base) => ({ ...base, color: "#fff" })
            }}
            onChange={(selected) => setFrameWork(selected)}
          />

          <p className='text-xs font-medium mt-6 text-gray-400 uppercase tracking-wide'>Description</p>
          <textarea
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className='w-full min-h-[180px] rounded-md bg-[#000] border border-zinc-900 mt-2 p-3 text-sm text-white placeholder-gray-600 outline-none focus:border-zinc-700 transition-colors resize-none'
            placeholder="Describe your component..."
          ></textarea>

          <div className="flex items-center justify-end mt-4">
            <button
              onClick={getResponse}
              disabled={loading}
              className="flex items-center px-4 py-2 rounded-md bg-white text-black text-sm font-medium gap-2 transition-all hover:bg-gray-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <ClipLoader color='black' size={14} /> : <BsStars size={14} />}
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full h-[75vh] bg-[#0a0a0a] border border-zinc-900 rounded-lg overflow-hidden">
          {
            !outputScreen ? (
              <div className="w-full h-full flex items-center flex-col justify-center">
                <div className="p-4 w-14 flex items-center justify-center text-2xl h-14 rounded-full bg-black border border-zinc-900">
                  <HiOutlineCode className="text-gray-500" />
                </div>
                <p className='text-sm text-gray-600 mt-3'>Your code will appear here</p>
              </div>
            ) : (
              <>
                <div className="bg-black w-full h-12 flex items-center gap-1 px-2 border-b border-zinc-900">
                  <button
                    onClick={() => setTab(1)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${tab === 1 ? "bg-zinc-900 text-white" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    Code
                  </button>
                  <button
                    onClick={() => setTab(2)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${tab === 2 ? "bg-zinc-900 text-white" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    Preview
                  </button>
                  <div className="flex-1"></div>
                  <div className="flex items-center gap-1">
                    {tab === 1 ? (
                      <>
                        <button onClick={copyCode} className="w-8 h-8 rounded flex items-center justify-center hover:bg-zinc-900 transition-colors text-gray-500 hover:text-white" title="Copy code"><IoCopy size={14} /></button>
                        <button onClick={downnloadFile} className="w-8 h-8 rounded flex items-center justify-center hover:bg-zinc-900 transition-colors text-gray-500 hover:text-white" title="Download file"><PiExportBold size={14} /></button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setIsNewTabOpen(true)} className="w-8 h-8 rounded flex items-center justify-center hover:bg-zinc-900 transition-colors text-gray-500 hover:text-white" title="Open fullscreen"><ImNewTab size={14} /></button>
                        <button onClick={() => setRefreshKey(prev => prev + 1)} className="w-8 h-8 rounded flex items-center justify-center hover:bg-zinc-900 transition-colors text-gray-500 hover:text-white" title="Refresh preview"><FiRefreshCcw size={14} /></button>
                      </>
                    )}
                  </div>
                </div>

                <div className="h-[calc(100%-48px)]">
                  {tab === 1 ? (
                    <Editor 
                      value={code} 
                      height="100%" 
                      theme='vs-dark' 
                      language="html"
                      options={{
                        fontSize: 13,
                        minimap: { enabled: false },
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        wordWrap: 'on',
                      }}
                    />
                  ) : (
                    <iframe key={refreshKey} srcDoc={code} className="w-full h-full bg-white" title="Component preview" />
                  )}
                </div>
              </>
            )
          }
        </div>
      </div>

     {/* Features Section */}
<div className="px-6 lg:px-12 py-20 border-t border-zinc-900">

  {/* Framework Flexibility - Top */}
  <div className="max-w-3xl mx-auto text-center mb-20">
    <h2 className="text-2xl font-medium text-white mb-2">Framework Flexibility</h2>
    <p className="text-gray-500 text-sm mb-10">
      Generate clean, responsive, and modern UI components using multiple tech stacks. 
      Choose your preferred framework and let AI build it for you instantly.
    </p>

    <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
      {["HTML", "CSS", "Tailwind", "Bootstrap", "JavaScript"].map((tech) => (
        <div
          key={tech}
          className="px-4 py-2 bg-black border border-zinc-900 rounded text-sm text-gray-400 hover:text-white hover:border-zinc-700 transition-colors"
        >
          {tech}
        </div>
      ))}
    </div>

    <button
      onClick={scrollToTop}
      className="px-6 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition-all active:scale-95"
    >
      Get Started
    </button>
  </div>

  {/* Reviews & Upcoming Features */}
  <div className="flex flex-col lg:flex-row items-start justify-between gap-12">

    {/* Left - Reviews & Suggestions */}
    <div className="lg:w-1/2 text-left">
      <h2 className="text-2xl font-medium text-white mb-2">Share Your Thoughts 💬</h2>
      <p className="text-gray-500 text-sm mb-8">
        We value your feedback! Share suggestions or feature ideas to help us improve.
      </p>

      <div className="bg-[#111] border border-zinc-800 rounded-xl p-6">
        <textarea
          className="w-full min-h-[150px] bg-black border border-zinc-800 rounded-lg text-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Write your review or suggest a feature..."
        ></textarea>
        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:opacity-90 active:scale-95 transition-all">
          Submit Feedback
        </button>
      </div>
    </div>

    {/* Right - Upcoming Features */}
    <div className="lg:w-1/2 text-left">
      <h2 className="text-2xl font-medium text-white mb-2">Upcoming Features 🚀</h2>
      <p className="text-gray-500 text-sm mb-6">
        Exciting updates planned for the AI Component Generator:
      </p>

      <ul className="space-y-4">
        {[
          "React + Tailwind Component Generation",
          "Next.js Page Generator with SEO Optimization",
          "Vue.js & Angular Support",
          "AI-powered Code Refactoring & Optimization",
          "Dark Mode / Light Mode Preview",
          "Live Collaboration Mode (real-time co-editing)",
          "Export as CodePen / Figma Plugin",
        ].map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-400">
            <span className="text-purple-500 mt-[2px]">•</span> {feature}
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>


      {/* How It Works Section */}
      <div className="px-6 lg:px-12 py-20 border-t border-zinc-900 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-white mb-3">How CODEFORGE Works</h2>
          <p className="text-gray-400 text-sm mb-10">
            CodeForge uses AI to generate production-ready, responsive UI components based on your description. 
            Simply describe the component, select the framework, and let the AI instantly create and preview the code.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { step: "1", title: "Choose Framework", desc: "Select your preferred tech stack like HTML, Tailwind, or Bootstrap." },
              { step: "2", title: "Describe Component", desc: "Write what kind of UI you want — button, card, form, or full layout." },
              { step: "3", title: "Generate Code", desc: "Click Generate and let AI instantly create a modern, responsive component." },
              { step: "4", title: "Preview & Export", desc: "View the live preview, copy the code, or download it as an HTML file." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="p-5 bg-black border border-zinc-900 rounded-lg hover:border-zinc-700 transition-colors">
                <div className="text-sm text-gray-400 font-semibold mb-2">Step {step}</div>
                <h3 className="text-white text-base font-medium mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Preview */}
      {isNewTabOpen && (
        <div className="fixed inset-0 bg-white w-screen h-screen overflow-auto z-50">
          <div className="w-full h-12 flex items-center justify-between px-4 bg-gray-50 border-b border-gray-200">
            <p className='text-sm font-medium text-gray-900'>Preview</p>
            <button onClick={() => setIsNewTabOpen(false)} className="w-8 h-8 rounded flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-700" title="Close preview">
              <IoCloseSharp size={18} />
            </button>
          </div>
          <iframe srcDoc={code} className="w-full h-[calc(100%-48px)]" title="Full screen preview" />
        </div>
      )}
      {/* -------- Footer -------- */}
<footer className="w-full border-t border-zinc-900 py-6 text-center bg-[#0a0a0a]">
  <p className="text-xs text-gray-500">
    © 2025 <span className="text-white font-medium">CodeFlow</span>. Built by{" "}
    <span className="text-purple-400 font-semibold">Lakshay Singh</span>.
  </p>
</footer>

    </>
  )
}

export default Home
