# LMS Frontend

### Setup Instruction

1. Clone the project.

```
    git clone https://github.com/ChinmayKaitade/LMS-Frontend-React-iNeuron.git
```

2. Move into the directory.

```
    cd LMS-Frontend-React-iNeuron
```

3. Install dependencies.

```
    npm i
```

4. Run the server.

```
    npm run dev
```

### Setup Instructions for Tailwind

[Tailwind Official Docs](https://tailwindcss.com/docs/installation)

1. Install tailwindcss.

```
    npm install -D tailwindcss postcss autoprefixer
```

2. Create tailwind config file.

```
    npx tailwindcss init -p
```

3. Add file extensions to tailwind config file in the contents property.

```
    "./src/**/*.{html,js,jsx,ts,tsx}", "./index.html",

```

4. Add the tailwind directives at the top of the `index.css` file.

```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

5. Add the following details in the plugin property of tailwind config.

```
    [require("daisyui"), require("@tailwindcss/line-clamp")]
```

### Adding Plugins and Dependencies

```
npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
```

### Configure auto import sort eslint

1. Install simple import sort.

```
    npm i -D eslint-plugin-simple-import-sort
```

plugin installed for Easy auto-fixable import sorting

2. Add rule in `.eslint.cjs`.

```
    'simple-import-sort/imports': 'error'
```

3. Add simple-import-sort plugin in `eslint.cjs`.

```
    plugins: [..., 'simple-import-sort']
```

4. To enable auto import sort on file save in vscode

   - Open `settings.json`
   - add the following config

```
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
```
