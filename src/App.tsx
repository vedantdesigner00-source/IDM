/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, ChevronDown, 
  ChevronUp, ArrowRight, Facebook, Twitter, Instagram, Linkedin, Youtube,
  Globe, GraduationCap, Users, BookOpen, Trophy, Bell, Clock, Info, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface NavLink {
  name: string;
  href: string;
  dropdown?: { name: string; icon: string; href?: string }[];
}

// --- Data ---

const NAV_LINKS: NavLink[] = [
  { 
    name: 'Home', 
    href: '#home', 
    dropdown: [
      { name: 'Home', icon: '🏠' },
      { name: 'Notices & Updates', icon: '📢' },
      { name: 'Photo Gallery', icon: '🖼️' }
    ] 
  },
  { 
    name: 'About', 
    href: '#about', 
    dropdown: [
      { name: 'About Department', icon: '🏛️' },
      { name: 'Mission & Vision', icon: '🎯' },
      { name: 'Our Faculty', icon: '👨‍🏫' },
      { name: 'Achievements', icon: '🏆' }
    ] 
  },
  { 
    name: 'Courses', 
    href: '#courses', 
    dropdown: [
      { name: 'MSc CA', icon: '🎓' },
      { name: 'MSc IT', icon: '💻' },
      { name: 'Syllabus', icon: '📋' }
    ] 
  },
  { 
    name: 'Admission', 
    href: '#notices', 
    dropdown: [
      { name: 'How to Apply', icon: '📝' },
      { name: 'Eligibility', icon: '📋' },
      { name: 'Important Dates', icon: '📅' },
      { name: 'Fee Structure', icon: '💰' }
    ] 
  },
  { name: 'Facilities', href: '#facilities' },
  { name: 'Contact', href: '#contact' },
];

const STATS = [
  { n: '2', l: 'PG Programs' },
  { n: '500+', l: 'Alumni' },
  { n: '15+', l: 'Expert Faculty' },
  { n: '90%', l: 'Placement Rate' },
  { n: 'HNGU', l: 'Affiliated' }
];

const COURSES_DATA = [
  {
    name: 'MSc CA',
    fullName: 'Master of Science in Computer Applications',
    desc: 'In-depth study of computer applications, algorithms, data structures, software engineering, database management, and modern programming paradigms.',
    img: 'https://picsum.photos/seed/mscca/600/400',
    subjects: [
      'Data Structures & Algorithms',
      'Object Oriented Programming (Java/C++)',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
      'Web Technologies',
      'Project Work'
    ]
  },
  {
    name: 'MSc IT',
    fullName: 'Master of Science in Information Technology',
    desc: 'Comprehensive program covering networking, cloud computing, cybersecurity, IoT, web technologies, and information systems management.',
    img: 'https://picsum.photos/seed/mscit/600/400',
    subjects: [
      'Network Security & Cryptography',
      'Cloud Computing',
      'Internet of Things (IoT)',
      'Mobile Application Development',
      'Big Data Analytics',
      'Artificial Intelligence',
      'E-Commerce Technologies',
      'Project Work'
    ]
  }
];

const NOTICES = [
  { d: '15', m: 'Jun', t: 'Admission Notice – MSc CA & IT 2025-26', b: 'New', bc: 'bg-green-100 text-green-700 border-green-200', desc: 'Applications invited for academic year 2025-26. Eligible candidates with BCA/BSc IT/BSc CS can apply online via HNGU portal.' },
  { d: '10', m: 'Jun', t: 'Semester IV Practical Exam Schedule', b: 'Important', bc: 'bg-red-100 text-red-700 border-red-200', desc: 'Practical examinations for Semester IV begin from 25 June 2025. Download timetable from notice board.' },
  { d: '05', m: 'Jun', t: 'Semester III Results Declared', b: 'Result', bc: 'bg-purple-100 text-purple-700 border-purple-200', desc: 'Results for Semester III (MSc CA & MSc IT) declared. Check results on HNGU official website.' },
  { d: '01', m: 'Jun', t: 'Annual Tech Fest "DigiVyom 2025" Registration', b: 'New', bc: 'bg-green-100 text-green-700 border-green-200', desc: 'Register for coding competitions, project exhibitions, and tech quizzes. Last date: 20 June 2025.' },
  { d: '28', m: 'May', t: 'State Government Scholarship – Last Date 30 June', b: 'Scholarship', bc: 'bg-blue-100 text-blue-700 border-blue-200', desc: 'SC/ST/OBC students: Submit scholarship forms before 30 June 2025 to the department office.' }
];

const FACULTY = [
  { n: 'Dr. Rajesh Sharma', d: 'Head of Department', s: 'PhD Computer Science · 18+ Years Experience', img: 'https://picsum.photos/seed/faculty1/300/400' },
  { n: 'Prof. Priya Patel', d: 'Assistant Professor', s: 'MCA, NET · Web Technologies & AI', img: 'https://picsum.photos/seed/faculty2/300/400' },
  { n: 'Prof. Amit Desai', d: 'Assistant Professor', s: 'MSc CS, NET · Networks & Security', img: 'https://picsum.photos/seed/faculty3/300/400' },
  { n: 'Prof. Sneha Joshi', d: 'Assistant Professor', s: 'MSc IT, NET · Cloud & Database', img: 'https://picsum.photos/seed/faculty4/300/400' }
];

const GALLERY = [
  { img: 'https://picsum.photos/seed/lab/600/400', l: 'Computer Lab', span: 'lg:row-span-2' },
  { img: 'https://picsum.photos/seed/lecture/600/400', l: 'Lectures' },
  { img: 'https://picsum.photos/seed/team/600/400', l: 'Teamwork' },
  { img: 'https://picsum.photos/seed/students/600/400', l: 'Students', span: 'lg:row-span-2' },
  { img: 'https://picsum.photos/seed/seminar/600/400', l: 'Seminars' }
];

const FACILITIES = [
  { i: '🖥️', n: 'Computer Labs', d: '100+ computers with latest software & high-speed internet' },
  { i: '📚', n: 'Digital Library', d: '5000+ books, journals & e-resources' },
  { i: '🌐', n: '1 Gbps Internet', d: 'High-speed campus Wi-Fi available 24/7' },
  { i: '🔬', n: 'Research Lab', d: 'Dedicated space for student projects & research' },
  { i: '🎤', n: 'Seminar Hall', d: '200-seat auditorium with AV equipment' },
  { i: '🤝', n: 'Placement Cell', d: 'Active support with 90%+ placement rate' }
];

// --- Components ---

const Reveal = ({ children, className = "", delay = 0, direction = "up", key }: { children: ReactNode, className?: string, delay?: number, direction?: "up" | "left" | "right" | "scale", key?: any }) => {
  return (
    <motion.div
      key={key}
      initial={{ 
        opacity: 0, 
        y: direction === "up" ? 40 : 0,
        x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
        scale: direction === "scale" ? 0.95 : 1
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const NavItem = ({ name, href, dropdown = [] }: { name: string, href: string, dropdown?: { name: string, icon: string }[], key?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="relative flex items-stretch" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <a href={href} className="flex items-center gap-1 px-4 text-[0.82rem] font-medium tracking-[0.6px] uppercase text-text border-b-[3px] border-transparent hover:text-blue hover:border-blue hover:bg-blue/5 transition-all">
        {name} {dropdown.length > 0 && <ChevronDown size={10} className={`mt-0.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </a>
      {dropdown.length > 0 && (
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute top-full left-0 min-w-[230px] bg-white border border-border border-t-[3px] border-t-blue rounded-b-lg py-1.5 shadow-xl z-50">
              {dropdown.map((item, idx) => (
                <a key={idx} href={href} className="flex items-center gap-2.5 px-4.5 py-2.5 text-[0.82rem] text-text hover:bg-blue/5 hover:text-blue hover:pl-5.5 transition-all">
                  <span className="w-5 text-center text-lg">{item.icon}</span> {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </li>
  );
};

const CourseCard = ({ course, index }: { course: typeof COURSES_DATA[0], index: number, key?: any }) => {
  const [showSubjects, setShowSubjects] = useState(false);
  return (
    <Reveal delay={index * 0.1} className="bg-white border border-border rounded-xl overflow-hidden shadow-md hover:-translate-y-2 transition-all group">
      <div className="h-[175px] overflow-hidden relative">
        <img src={course.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={course.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent"></div>
      </div>
      <div className="p-6">
        <span className="inline-block bg-gold-bg text-gold border border-gold/25 text-[0.67rem] font-bold tracking-[1.5px] uppercase px-2.5 py-1 rounded-full mb-3">Postgraduate</span>
        <h3 className="font-serif text-2xl font-bold text-navy mb-1">{course.name}</h3>
        <div className="text-[0.74rem] text-blue tracking-[0.8px] uppercase mb-3">{course.fullName}</div>
        <p className="text-[0.88rem] text-muted leading-relaxed mb-4">{course.desc}</p>
        <div className="flex gap-4 text-[0.74rem] text-muted border-t border-border pt-3 mb-4">
          <span>⏱️ 2 Years</span><span>📚 4 Semesters</span><span>🎓 PG Degree</span>
        </div>
        <button 
          onClick={() => setShowSubjects(!showSubjects)}
          className="w-full flex justify-between items-center bg-transparent border border-border text-blue text-[0.76rem] font-medium tracking-[0.8px] uppercase px-3.5 py-2.5 rounded-md hover:bg-blue/5 hover:border-blue transition-all"
        >
          📖 View Subjects <ChevronDown size={14} className={`transition-transform ${showSubjects ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {showSubjects && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <ul className="pt-4 space-y-2">
                {course.subjects.map((sub, i) => (
                  <li key={i} className="text-[0.82rem] text-muted border-b border-dashed border-border py-1.5 flex items-center gap-2">
                    <span className="text-blue font-bold">›</span> {sub}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 340);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text selection:bg-gold/30">
      
      {/* Top Strip */}
      <div className="bg-navy text-white/75 py-1.5 px-6 md:px-12 flex justify-between items-center text-[0.73rem] tracking-wide z-50">
        <span className="hidden md:inline">📍 Hemchandracharya North Gujarat University, Patan – 384265, Gujarat</span>
        <span className="md:hidden">📍 HNGU, Patan</span>
        <div className="flex gap-5">
          <a href="tel:+912762231651" className="hover:text-white transition-colors">📞 02762-231651</a>
          <a href="mailto:info@ngu.ac.in" className="hidden sm:inline hover:text-white transition-colors">✉️ info@ngu.ac.in</a>
          <a href="https://www.ngu.ac.in" target="_blank" className="hidden lg:inline hover:text-white transition-colors">🌐 www.ngu.ac.in</a>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-[60] bg-white border-b-2 border-border shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3.5">
            <div className="nav-logo-circle">SI</div>
            <div>
              <h1 className="font-serif text-navy font-bold text-[0.9rem] leading-tight max-w-[230px]">ShreeMati Indu Dayal Maishri</h1>
              <p className="text-[0.65rem] text-muted tracking-[0.4px] mt-0.5">CS & IT Department · HNGU, Patan</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex h-full list-none">
            {NAV_LINKS.map((link, idx) => (
              <NavItem key={idx} name={link.name} href={link.href} dropdown={link.dropdown} />
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-navy" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-navy/97 pt-20 px-8 overflow-y-auto lg:hidden"
          >
            <ul className="list-none space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.name} className="border-b border-white/10">
                  <a href={link.href} onClick={() => setIsMenuOpen(false)} className="block py-4 text-white text-[1.05rem] font-medium">{link.name}</a>
                  {link.dropdown && (
                    <div className="pl-4 pb-4 space-y-3">
                      {link.dropdown.map(d => (
                        <a key={d.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-white/70 text-sm">{d.icon} {d.name}</a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* Hero */}
        <section id="home" className="relative bg-gradient-to-br from-navy via-navy2 to-[#1e3a6e] py-16 md:py-24 px-6 md:px-12 min-h-[88vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-pattern"></div>
          <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] rounded-full bg-radial-gradient from-gold/15 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <Reveal delay={0.1} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-[0.72rem] tracking-[1.5px] uppercase px-3.5 py-1.5 rounded-full mb-6">
                🎓 Hemchandracharya North Gujarat University
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="font-serif text-4xl md:text-6xl font-black text-white leading-[1.15] mb-3">
                  ShreeMati Indu Dayal<br />Maishri <span className="text-gold-lt italic">CS & IT</span>
                </h2>
              </Reveal>
              <Reveal delay={0.3} className="text-[0.88rem] text-white/65 tracking-[1.2px] uppercase mb-5">
                Department of Computer Science & Information Technology
              </Reveal>
              <Reveal delay={0.4} className="text-[0.98rem] leading-relaxed text-white/80 max-w-[490px] mb-9">
                A centre of academic excellence dedicated to nurturing skilled technology professionals through rigorous postgraduate programs in computer applications and information technology.
              </Reveal>
              <Reveal delay={0.5} className="flex flex-wrap gap-3.5">
                <a href="#courses" className="btn-p">Explore Courses</a>
                <a href="#contact" className="btn-o">Contact Us</a>
              </Reveal>
              <Reveal delay={0.6} className="mt-7 bg-white/8 text-white/80 border border-white/20 rounded-lg p-3.5 flex items-center gap-3 max-w-fit">
                <span className="bg-gold text-white text-[0.62rem] font-bold tracking-wider uppercase px-2 py-1 rounded">📢 Notice</span>
                <span className="text-[0.82rem]">Admissions open for MSc CA & IT 2025-26. Last date: 31 July 2025</span>
              </Reveal>
            </div>

            <Reveal direction="right" className="hidden lg:grid grid-cols-2 grid-rows-[210px_175px] gap-2.5">
              <div className="row-span-2 rounded-lg overflow-hidden relative group">
                <img src="https://picsum.photos/seed/campus/600/800" className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-700" alt="Campus" />
                <div className="absolute bottom-2.5 left-2.5 bg-navy/85 backdrop-blur-md text-white text-[0.65rem] tracking-wider uppercase px-2 py-1 rounded">Campus Life</div>
              </div>
              <div className="rounded-lg overflow-hidden relative group">
                <img src="https://picsum.photos/seed/lab-tech/600/400" className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-700" alt="Lab" />
                <div className="absolute bottom-2.5 left-2.5 bg-navy/85 backdrop-blur-md text-white text-[0.65rem] tracking-wider uppercase px-2 py-1 rounded">Tech Labs</div>
              </div>
              <div className="rounded-lg overflow-hidden relative group">
                <img src="https://picsum.photos/seed/students-group/600/400" className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-700" alt="Students" />
                <div className="absolute bottom-2.5 left-2.5 bg-navy/85 backdrop-blur-md text-white text-[0.65rem] tracking-wider uppercase px-2 py-1 rounded">Students</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Ticker */}
        <div className="bg-gold py-2 overflow-hidden flex items-center">
          <div className="bg-navy text-white text-[0.7rem] font-bold tracking-[2px] uppercase px-4.5 py-1 z-10 shrink-0">📢 Updates</div>
          <div className="flex whitespace-nowrap animate-marquee">
            {[1, 2].map(i => (
              <div key={i} className="flex gap-11 px-11 text-white text-[0.78rem] font-semibold tracking-wide">
                <span>🎓 Admissions Open — MSc CA & MSc IT 2025-26</span>
                <span>📅 Semester Exam Schedule Released — Check Notice Board</span>
                <span>🏆 Students Placed at TCS, Infosys, Wipro & More</span>
                <span>🔬 New Research Lab Inaugurated by HNGU VC</span>
                <span>📝 Scholarship Last Date: 30 June 2025</span>
                <span>🎉 Annual Tech Fest "DigiVyom 2025" — Register Now</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border-b border-border py-12 px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 text-center">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} direction="scale">
              <div className="font-serif text-[2.4rem] font-black text-blue leading-none">{s.n}</div>
              <div className="text-[0.74rem] tracking-[1.5px] uppercase text-muted mt-2">{s.l}</div>
            </Reveal>
          ))}
        </div>

        {/* About */}
        <section id="about" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-2xl group">
                <img src="https://picsum.photos/seed/classroom/800/600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="About" />
                <div className="absolute top-3.5 left-3.5 w-9 h-9 border-t-4 border-l-4 border-gold"></div>
                <div className="absolute bottom-3.5 right-3.5 w-9 h-9 border-b-4 border-r-4 border-gold"></div>
              </div>
            </Reveal>
            <div>
              <Reveal className="sec-lbl">Who We Are</Reveal>
              <Reveal delay={0.1}><h2 className="sec-title">Shaping the Next<br />Generation of<br />Tech Leaders</h2></Reveal>
              <Reveal delay={0.2} className="text-[0.97rem] leading-relaxed text-muted max-w-[580px] mb-6">ShreeMati Indu Dayal Maishri Department of Computer Science and IT is part of Hemchandracharya North Gujarat University (HNGU), Patan. We blend rigorous academics with industry-oriented practical training to produce job-ready IT professionals.</Reveal>
              <div className="space-y-3.5">
                <Reveal delay={0.3} className="acard"><h3>🎯 Our Mission</h3><p className="text-[0.88rem] text-muted">To empower students with cutting-edge technical knowledge and analytical problem-solving skills to excel in the ever-evolving IT industry.</p></Reveal>
                <Reveal delay={0.4} className="acard"><h3>🌟 Our Vision</h3><p className="text-[0.88rem] text-muted">To be a leading department producing globally competitive IT professionals who contribute meaningfully to society through technology.</p></Reveal>
                <Reveal delay={0.5} className="acard"><h3>🏆 Achievements</h3><p className="text-[0.88rem] text-muted">NAAC Accredited University · Students placed in MNCs across India · Regular industry visits and guest lectures.</p></Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Courses */}
        <section id="courses" className="py-24 px-6 md:px-12 bg-bg">
          <div className="max-w-7xl mx-auto">
            <Reveal className="sec-lbl">Academics</Reveal>
            <Reveal delay={0.1}><h2 className="sec-title">Courses We Offer</h2></Reveal>
            <Reveal delay={0.2} className="text-[0.97rem] leading-relaxed text-muted max-w-[580px] mb-10">Postgraduate programs designed to give you a strong foundation in computer science, programming, networking, and emerging technologies.</Reveal>
            <div className="grid md:grid-cols-2 gap-8">
              {COURSES_DATA.map((c, i) => (
                <CourseCard key={i} course={c} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Notices */}
        <section id="notices" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <Reveal className="sec-lbl">Updates</Reveal>
            <Reveal delay={0.1}><h2 className="sec-title">Notices & Admissions</h2></Reveal>
            <div className="grid lg:grid-cols-3 gap-10 mt-11">
              <div className="lg:col-span-2 space-y-0">
                {NOTICES.map((n, i) => (
                  <Reveal key={i} delay={i * 0.1} className="flex gap-5 py-5 border-b border-border hover:pl-2 transition-all cursor-pointer group">
                    <div className="shrink-0 w-[56px] text-center bg-bg3 border border-border rounded-lg p-2.5">
                      <div className="font-serif text-[1.4rem] font-bold text-blue leading-none">{n.d}</div>
                      <div className="text-[0.65rem] tracking-[1px] uppercase text-muted mt-1">{n.m}</div>
                    </div>
                    <div>
                      <span className={`inline-block text-[0.62rem] font-bold tracking-[1px] uppercase px-2.5 py-0.5 rounded-full mb-1.5 border ${n.bc}`}>{n.b}</span>
                      <h4 className="text-[0.95rem] font-bold text-navy group-hover:text-blue transition-colors">{n.t}</h4>
                      <p className="text-[0.82rem] text-muted mt-1 leading-relaxed">{n.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="space-y-6">
                <Reveal className="bg-white border border-border rounded-xl p-6 shadow-lg">
                  <div className="text-[0.75rem] font-bold tracking-[2px] uppercase text-blue mb-4 flex items-center gap-2">📋 Admission 2025-26</div>
                  <ul className="text-[0.86rem] text-muted space-y-2.5">
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">Courses: MSc CA, MSc IT</li>
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">Eligibility: BCA / BSc IT / BSc CS</li>
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">Min. Marks: 50% aggregate</li>
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">Duration: 2 Years (4 Sem)</li>
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">Last Date: 31 July 2025</li>
                  </ul>
                  <a href="#contact" className="block bg-blue text-white text-center py-3 rounded-md text-[0.82rem] font-bold tracking-[1px] uppercase mt-5 hover:bg-navy hover:-translate-y-1 transition-all shadow-md">Apply Now →</a>
                </Reveal>
                <Reveal delay={0.1} className="bg-white border border-border rounded-xl p-6 shadow-lg">
                  <div className="text-[0.75rem] font-bold tracking-[2px] uppercase text-blue mb-4 flex items-center gap-2">💰 Fee Structure</div>
                  <ul className="text-[0.86rem] text-muted space-y-2.5">
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">MSc CA – ₹25,000 / Year</li>
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">MSc IT – ₹25,000 / Year</li>
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">Lab Fee – ₹2,000 / Sem</li>
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">Library – ₹500 / Year</li>
                  </ul>
                </Reveal>
                <Reveal delay={0.2} className="bg-white border border-border rounded-xl p-6 shadow-lg">
                  <div className="text-[0.75rem] font-bold tracking-[2px] uppercase text-blue mb-4 flex items-center gap-2">📅 Important Dates</div>
                  <ul className="text-[0.86rem] text-muted space-y-2.5">
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">Forms Available: 1 June 2025</li>
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">Last Date: 31 July 2025</li>
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">Merit List: 10 Aug 2025</li>
                    <li className="flex items-center gap-2 before:content-['◆'] before:text-[0.5rem] before:text-gold">Classes Begin: 1 Sept 2025</li>
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Faculty */}
        <section id="faculty" className="py-24 px-6 md:px-12 bg-bg3">
          <div className="max-w-7xl mx-auto">
            <Reveal className="sec-lbl">Our Team</Reveal>
            <Reveal delay={0.1}><h2 className="sec-title">Faculty Members</h2></Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-11">
              {FACULTY.map((f, i) => (
                <Reveal key={i} delay={i * 0.1} className="bg-white border border-border rounded-xl overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-xl transition-all text-center group">
                  <div className="h-[200px] overflow-hidden">
                    <img src={f.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={f.n} />
                  </div>
                  <div className="p-5 pb-6">
                    <div className="font-serif text-[1.1rem] font-bold text-navy mb-1">{f.n}</div>
                    <div className="text-[0.78rem] text-blue font-bold mb-2 tracking-wide uppercase">{f.d}</div>
                    <div className="text-[0.8rem] text-muted leading-tight">{f.s}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <Reveal className="sec-lbl">Campus Life</Reveal>
            <Reveal delay={0.1}><h2 className="sec-title">Life at Our Department</h2></Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-11">
              {GALLERY.map((g, i) => (
                <Reveal key={i} delay={i * 0.1} className={`rounded-xl overflow-hidden relative group cursor-pointer ${g.span || ''}`}>
                  <img src={g.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={g.l} />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 text-navy text-[0.7rem] font-bold tracking-wider uppercase px-3 py-1.5 rounded opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">{g.l}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section id="facilities" className="py-24 px-6 md:px-12 bg-bg">
          <div className="max-w-7xl mx-auto">
            <Reveal className="sec-lbl">Infrastructure</Reveal>
            <Reveal delay={0.1}><h2 className="sec-title">Our Facilities</h2></Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-11">
              {FACILITIES.map((f, i) => (
                <Reveal key={i} delay={i * 0.1} className="bg-white border border-border rounded-xl p-6 flex items-start gap-5 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all group">
                  <div className="shrink-0 w-14 h-14 bg-bg3 rounded-xl flex items-center justify-center text-3xl group-hover:bg-blue group-hover:text-white transition-colors">{f.i}</div>
                  <div>
                    <div className="text-[1rem] font-bold text-navy mb-1.5">{f.n}</div>
                    <div className="text-[0.82rem] text-muted leading-relaxed">{f.d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <Reveal className="sec-lbl">Get In Touch</Reveal>
            <Reveal delay={0.1}><h2 className="sec-title">Contact Us</h2></Reveal>
            <div className="grid lg:grid-cols-2 gap-12 mt-11">
              <Reveal direction="left" className="bg-white border border-border rounded-xl p-8 shadow-xl">
                <h3 className="font-serif text-[1.3rem] font-bold text-navy mb-8">Send us a Message</h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold tracking-[1px] uppercase text-navy">Full Name</label>
                    <input type="text" className="w-full bg-bg3 border border-border rounded-md px-4 py-3 text-[0.9rem] outline-none focus:border-blue focus:bg-white transition-all shadow-inner" placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold tracking-[1px] uppercase text-navy">Email Address</label>
                    <input type="email" className="w-full bg-bg3 border border-border rounded-md px-4 py-3 text-[0.9rem] outline-none focus:border-blue focus:bg-white transition-all shadow-inner" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.75rem] font-bold tracking-[1px] uppercase text-navy">Message</label>
                    <textarea className="w-full bg-bg3 border border-border rounded-md px-4 py-3 text-[0.9rem] outline-none focus:border-blue focus:bg-white transition-all min-h-[140px] shadow-inner" placeholder="Write your message here..."></textarea>
                  </div>
                  <button className="w-full bg-blue text-white py-4 rounded-md text-[0.9rem] font-bold tracking-[1px] uppercase hover:bg-navy hover:-translate-y-1 transition-all shadow-lg">Send Message →</button>
                </div>
              </Reveal>
              <Reveal direction="right" className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {i: '📍', h: 'Address', p: 'Hemchandracharya North Gujarat University, Patan – 384265, Gujarat, India'},
                    {i: '📞', h: 'Phone', p: '02762-231651 / 231652'},
                    {i: '✉️', h: 'Email', p: 'info@ngu.ac.in | csit.dept@ngu.ac.in'},
                    {i: '🕐', h: 'Office Hours', p: 'Mon – Fri: 10:00 AM – 5:00 PM\nSat: 10:00 AM – 1:00 PM'},
                    {i: '🌐', h: 'Website', p: 'www.ngu.ac.in'}
                  ].map((c, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 bg-bg3/50 rounded-xl border border-border/50">
                      <div className="shrink-0 w-11 h-11 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">{c.i}</div>
                      <div><h4 className="text-[0.9rem] font-bold text-navy mb-1">{c.h}</h4><p className="text-[0.82rem] text-muted leading-relaxed whitespace-pre-line">{c.p}</p></div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl overflow-hidden border border-border shadow-xl h-[240px]">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.4!2d72.116!3d23.849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2d9bc6f15555%3A0x84dcb3b3b0e!2sHemchandracharya%20North%20Gujarat%20University!5e0!3m2!1sen!2sin!4v1699999999999" className="w-full h-full grayscale" loading="lazy"></iframe>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy py-20 px-6 md:px-12 text-white/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <Reveal>
            <div className="font-serif text-[1.15rem] text-white font-bold leading-tight mb-4">ShreeMati Indu Dayal Maishri<br />CS & IT Department</div>
            <p className="text-[0.88rem] leading-relaxed mb-6">Affiliated with Hemchandracharya North Gujarat University (HNGU), Patan. Committed to excellence in technical education and research.</p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"><Icon size={16} /></a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="text-[0.7rem] tracking-[2px] uppercase text-white/50 mb-6">Quick Links</div>
            <ul className="text-[0.88rem] space-y-3.5">
              {['Home', 'About Department', 'Courses', 'Faculty', 'Gallery', 'HNGU Official'].map(l => (
                <li key={l}><a href="#" className="hover:text-white hover:pl-1.5 transition-all flex items-center gap-2 before:content-['›'] before:text-gold-lt before:font-bold">{l}</a></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="text-[0.7rem] tracking-[2px] uppercase text-white/50 mb-6">Academics</div>
            <ul className="text-[0.88rem] space-y-3.5">
              {['MSc CA Program', 'MSc IT Program', 'Syllabus', 'Exam Schedule', 'Results', 'Scholarships'].map(l => (
                <li key={l}><a href="#" className="hover:text-white hover:pl-1.5 transition-all flex items-center gap-2 before:content-['›'] before:text-gold-lt before:font-bold">{l}</a></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="text-[0.7rem] tracking-[2px] uppercase text-white/50 mb-6">Contact</div>
            <ul className="text-[0.88rem] space-y-4">
              <li className="flex items-start gap-3">📍 <span className="hover:text-white transition-colors">HNGU, Patan – 384265, Gujarat</span></li>
              <li className="flex items-start gap-3">📞 <a href="tel:+912762231651" className="hover:text-white transition-colors">02762-231651</a></li>
              <li className="flex items-start gap-3">✉️ <a href="mailto:info@ngu.ac.in" className="hover:text-white transition-colors">info@ngu.ac.in</a></li>
              <li className="flex items-start gap-3">🌐 <a href="https://www.ngu.ac.in" target="_blank" className="hover:text-white transition-colors">www.ngu.ac.in</a></li>
            </ul>
          </Reveal>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[0.8rem] opacity-40">© 2024–25 ShreeMati Indu Dayal Maishri CS & IT Department, HNGU. All rights reserved.</p>
          <span className="text-[0.75rem] text-gold-lt opacity-75 tracking-[1px] font-bold">NAAC Accredited · HNGU Affiliated</span>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-blue text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl hover:bg-navy hover:-translate-y-1.5 transition-all"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 35s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
