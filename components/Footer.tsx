export function Footer() {
  return (
    <footer className="bg-void text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Kamal Saloi</h3>
            <p className="text-slate-400">
              Creative designer focused on building beautiful digital experiences.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition">Projects</a></li>
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-white transition">Dribbble</a>
              <a href="#" className="text-slate-400 hover:text-white transition">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="border-t border-void-line pt-8 text-center text-slate-400">
          <p>&copy; 2026 Kamal Saloi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
