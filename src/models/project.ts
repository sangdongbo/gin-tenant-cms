import { useState, useCallback } from 'react';

export default function useProjectModel() {
  const [project, setProject] = useState<any>({});

  const updaterProject = useCallback((playload) => {
    setProject({ ...project, ...playload });
  }, []);

  return {
    project,
    updaterProject,
  };
}
