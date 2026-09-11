/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BLOG_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
