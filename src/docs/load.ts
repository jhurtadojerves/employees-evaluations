/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import YAML from 'yamljs';
import fs from 'fs';
import path from 'path';

interface SwaggerDocs {
  paths: Record<string, any>;
  components?: {
    schemas?: Record<string, any>;
  };
}

export const loadDocs = (docsDirPath: string): SwaggerDocs => {
  const absolutePath = path.resolve(docsDirPath);
  const files = fs.readdirSync(absolutePath);

  const docs: SwaggerDocs = {
    paths: {},
    components: {
      schemas: {},
    },
  };

  files.forEach((file) => {
    if (file.endsWith('.yaml') || file.endsWith('.yml')) {
      const filePath = path.join(absolutePath, file);
      const loadedDoc = YAML.load(filePath);

      if (loadedDoc.paths) {
        docs.paths = { ...docs.paths, ...loadedDoc.paths };
      }
      if (loadedDoc.components?.schemas) {
        docs.components = docs.components || { schemas: {} };
        docs.components.schemas = { ...docs.components.schemas, ...loadedDoc.components.schemas };
      }
    }
  });

  return docs;
};
