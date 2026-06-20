import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Tag, Calendar, Clock, BookOpen, ChevronLeft, Heart, Eye } from 'lucide-react';
import { BlogPost } from '../types';
import AnimatedHeading from './AnimatedHeading';
import { calculateReadingTime } from '../utils/readingTime';

interface BlogProps {
  darkMode: boolean;
  blogs: BlogPost[];
  onLikeBlog: (id: string) => void;
  onViewBlog: (id: string) => void;
}

export default function Blog({ darkMode, blogs, onLikeBlog, onViewBlog }: BlogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(blogs.flatMap((b) => b.tags)));

  // Filter articles
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.brief.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? b.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleOpenArticle = (blog: BlogPost) => {
    onViewBlog(blog.id);
    setActiveArticle(blog);
  };

  const handleBackToList = () => {
    setActiveArticle(null);
  };

  // Safe custom markdown inline parser and renderer
  const renderMarkdownContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // H2 Heading
      if (line.startsWith('## ')) {
        return (
          <h3 key={index} className="text-xl sm:text-2xl font-bold font-display text-white mt-6 mb-3 border-b border-white/5 pb-2">
            {line.substring(3)}
          </h3>
        );
      }
      // H3 Heading
      if (line.startsWith('### ')) {
        return (
          <h4 key={index} className="text-lg font-bold font-display text-accent-cyan mt-4 mb-2">
            {line.substring(4)}
          </h4>
        );
      }
      // Unordered list
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return (
          <li key={index} className="list-disc list-inside ml-4 text-sm sm:text-base text-slate-300 dark:text-slate-350 light:text-slate-650 mb-1.5 font-sans">
            {line.substring(2)}
          </li>
        );
      }
      // Code blocks (simple check)
      if (line.startsWith('```')) {
        return null; // Skip code blocks wrap wrappers in this simple custom parser
      }
      // Non-empty paragraph
      if (line.trim()) {
        return (
          <p key={index} className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4 font-sans font-normal">
            {line}
          </p>
        );
      }
      // Empty line
      return <div key={index} className="h-2" />;
    });
  };

  return (
    <section
      id="blog"
      className={`py-20 md:py-28 relative ${
        darkMode ? 'bg-[#0b1a0d] text-white' : 'bg-white text-slate-950'
      }`}
    >
      <div className="absolute top-[30%] left-[3%] w-[300px] h-[300px] bg-secondary-purple/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <AnimatePresence mode="wait">
          {!activeArticle ? (
            /* BLOG ARTICLES LIST VIEW */
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-12"
            >
              {/* Section Heading */}
              <div className="text-center max-w-3xl mx-auto">
                <AnimatedHeading
                  text="Developer Insights"
                  tag="h2"
                  className="text-xs font-mono font-bold tracking-widest text-primary-blue uppercase"
                />
                <p className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight mt-2.5">
                  The Markdown Blog
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-primary-blue to-accent-cyan mx-auto mt-4 rounded-full" />
              </div>

              {/* Filters & Actions line */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                
                {/* Search Bar query */}
                <div className="md:col-span-5 relative">
                  <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm transition-all outline-none ${
                      darkMode 
                        ? 'border-white/10 bg-slate-900 focus:border-accent-cyan focus:bg-slate-900/80 text-white' 
                        : 'border-slate-200 bg-slate-50 focus:border-accent-cyan focus:bg-white text-slate-900'
                    }`}
                  />
                </div>

                {/* Tags scrolling filters */}
                <div className="md:col-span-7 flex flex-wrap gap-2 py-1 overflow-x-auto">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3.5 py-1.8 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedTag === null
                        ? 'bg-gradient-to-r from-primary-blue to-accent-cyan text-white shadow-md'
                        : darkMode ? 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white' : 'bg-slate-100 border border-slate-250 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Tags
                  </button>

                  {allTags.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTag(t)}
                      className={`px-3.5 py-1.8 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                        selectedTag === t
                          ? 'bg-gradient-to-r from-primary-blue to-accent-cyan text-white shadow-md'
                          : darkMode ? 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white' : 'bg-slate-100 border border-slate-250 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Tag className="w-3 h-3" />
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => handleOpenArticle(b)}
                      className={`p-6 sm:p-8 rounded-3xl border cursor-pointer hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden ${
                        darkMode ? 'bg-slate-900/60 border-white/5 hover:bg-slate-900' : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-xl'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {b.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {calculateReadingTime(b.content)}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold font-display group-hover:text-accent-cyan transition-colors">
                          {b.title}
                        </h3>

                        <p className={`text-sm sm:text-base leading-relaxed ${
                          darkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {b.brief}
                        </p>
                      </div>

                      {/* Content tags and author info row */}
                      <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
                        <div className="flex gap-1.5">
                          {b.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[10px] font-mono tracking-wider text-slate-400 border border-white/10 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-cyan font-mono group-hover:translate-x-1 transition-transform">
                          Read Post
                          <BookOpen className="w-4 h-4 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center space-y-4">
                    <p className="font-mono text-slate-400">No blog posts found matching your search matrix.</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* DETAILED FULL ARTICLE MARKDOWN READER */
            <motion.div
              key="reader-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className={`max-w-3xl mx-auto rounded-3xl border overflow-hidden p-6 sm:p-10 ${
                darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {/* Back to list trigger */}
              <button
                onClick={handleBackToList}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.8 rounded-xl border text-xs font-bold font-mono tracking-wider uppercase mb-8 transition-colors cursor-pointer ${
                  darkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 bg-white hover:bg-slate-100'
                }`}
              >
                <ChevronLeft className="w-4.5 h-4.5" />
                Back to Articles
              </button>

              <article className="space-y-6">
                
                {/* Meta details header info */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {activeArticle.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {calculateReadingTime(activeArticle.content)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {activeArticle.views} Views
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3.5xl font-extrabold font-display leading-tight">
                    {activeArticle.title}
                  </h1>

                  {/* Author avatar and row details */}
                  <div className="flex items-center gap-3 py-2.5 border-b border-t border-white/5">
                    <div className="w-9 h-9 rounded-full bg-slate-950 overflow-hidden border">
                      <img
                        src="https://i.ibb.co.com/v6D34xzk/Messenger-creation-BC26-C2-E9-C3-B7-4731-B86-C-6-B4230-C253-DE.jpg"
                        alt="Akib Satej"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold font-display">{activeArticle.author}</p>
                      <p className="text-[10px] font-mono tracking-wider opacity-60">Full-Stack Contributor</p>
                    </div>
                  </div>
                </div>

                {/* Markdown content parser wrapper container */}
                <div className={`markdown-body pt-4 leading-relaxed font-sans ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {renderMarkdownContent(activeArticle.content)}
                </div>

                {/* Interactive liking row */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-8">
                  <div className="flex gap-2">
                    {activeArticle.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 tracking-wide text-slate-400 uppercase">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      onLikeBlog(activeArticle.id);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl font-bold font-mono text-xs text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 animate-pulse text-rose-500" />
                    <span>Like Article ({activeArticle.likes})</span>
                  </button>
                </div>

              </article>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
