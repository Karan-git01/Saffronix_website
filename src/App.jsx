import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import { posts } from "./data/posts";

/** Resolves the :slug param to a post and hands it to the BlogPost
    template. Falls back to BlogPost's own default (posts[0]) if the
    slug doesn't match anything, so a bad URL still renders instead of
    crashing - swap in a proper 404 later if you want. */
function BlogPostRoute() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  return <BlogPost post={post} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;