/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ARTIFACTS, ArtifactItem } from './data/archiveData';
import { TopNav } from './components/TopNav';
import { HeroExhibition } from './components/HeroExhibition';
import { BiographySection } from './components/BiographySection';
import { TimelineSection } from './components/TimelineSection';
import { BattlesSection } from './components/BattlesSection';
import { ArchiveGallerySection } from './components/ArchiveGallerySection';
import { ArtifactLightbox } from './components/ArtifactLightbox';
import { Footer } from './components/Footer';

export type ThemeMode = 'light' | 'dark';

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem('archive-theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // ignore storage errors
  }
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactItem | null>(
    null
  );
  const [selectedSide, setSelectedSide] = useState<'primary' | 'secondary'>(
    'primary'
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('archive-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const openArtifactById = (
    artifactId: string,
    side: 'primary' | 'secondary' = 'primary'
  ) => {
    const found = ARTIFACTS.find((a) => a.id === artifactId);
    if (found) {
      setSelectedArtifact(found);
      setSelectedSide(side);
    }
  };

  const scrollToArchive = () => {
    const el = document.getElementById('archive');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FBF9F5] dark:bg-[#141210] text-[#1C1917] dark:text-[#F5F2EB] flex flex-col transition-colors duration-200"
    >
      <TopNav onInspectArchive={scrollToArchive} />

      <main className="flex-1">
        <HeroExhibition
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenPortrait={() => openArtifactById('portrait-mujahid', 'primary')}
          onJumpToArchive={scrollToArchive}
        />

        <BiographySection
          onSelectArtifact={(id) => openArtifactById(id, 'primary')}
        />

        <TimelineSection
          onSelectArtifact={(id) => openArtifactById(id, 'primary')}
        />

        <BattlesSection />

        <ArchiveGallerySection
          onInspectArtifact={(artifact, side = 'primary') => {
            setSelectedArtifact(artifact);
            setSelectedSide(side);
          }}
        />
      </main>

      <Footer theme={theme} onToggleTheme={toggleTheme} />

      <ArtifactLightbox
        artifact={selectedArtifact}
        initialSide={selectedSide}
        onClose={() => setSelectedArtifact(null)}
        onSelectArtifact={(artifact) => {
          setSelectedArtifact(artifact);
          setSelectedSide('primary');
        }}
      />
    </div>
  );
}
