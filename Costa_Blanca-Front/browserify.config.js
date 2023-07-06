const browserify = require("browserify");

browserify({
  entries: "src/main.ts", // Substitua 'src/main.ts' pelo caminho do seu arquivo principal TypeScript
  debug: true, // Ativa os sourcemaps para facilitar a depuração
})
  .plugin("tsify") // Usa o plugin 'tsify' para transpilar o código TypeScript
  .bundle() // Empacota o código e seus módulos em um único arquivo
  .pipe(process.stdout); // Saída para o console, você pode redirecionar para um arquivo se preferir
