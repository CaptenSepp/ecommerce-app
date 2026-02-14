import React from "react";

const Retailers: React.FC = () => ( // simple retailers page
  <div className="flex flex-col gap-6 px-4 py-10"> {/* base page spacing */}
    <div className="flex flex-col gap-2"> {/* heading block */}
      <h1 className="u-text-2xl u-font-bold">Retailers</h1> {/* page title */}
      <p className="text-[color:var(--text-muted)]">
        Find nearby retailers on the map below.
      </p>
    </div>

    <div className="rounded-lg border border-[color:var(--border-color)] overflow-hidden bg-white"> {/* map frame */}
      <iframe
        title="Retailers map"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-122.516%2C37.706%2C-122.357%2C37.816&layer=mapnik"
        className="w-full h-[420px]" // fixed height for map
        loading="lazy" // load map only when visible
      />
    </div>
  </div>
)

export default Retailers
