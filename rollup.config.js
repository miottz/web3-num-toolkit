import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',  // 输入文件
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',  // CommonJS 模块格式
    },
    {
      file: 'dist/index.js',
      format: 'esm',  // ES 模块格式
    },
  ],
  plugins: [typescript({ tsconfig: './tsconfig.json' })],  // 插件：支持 TypeScript
};