Haunted HouseA spooky and atmospheric 3D scene that transports you to a haunted house at dusk. This project showcases advanced Three.js features like dynamic lighting, fog effects, and a configurable environment, all designed to create a chilling experience.DemoFeaturesInteractive 3D Haunted House: Explore a chilling 3D scene with a detailed haunted house model.Dynamic Lighting: Manipulate ambient, directional, and point lights to set the mood.Atmospheric Fog: Control the fog color and density to create a mysterious and spooky environment.Configurable Elements: Toggle the visibility of ghosts, graves, a hanging man, and chimney smoke for a customized experience.Graphical User Interface (GUI): A comprehensive GUI for real-time control over all scene properties.Custom Models and Textures: The scene is built with custom 3D models and textures to enhance the aesthetic.Tech StackThis project leverages cutting-edge web technologies for an immersive 3D experience.Vite: Used for a lightning-fast development setup and optimized production builds.Three.js: The core library for all 3D rendering, lighting, and model management.GLSL: Custom shaders are used to create realistic effects like fog and atmospheric haze.lil-gui: A lightweight library that provides the GUI for scene manipulation.Getting StartedFollow these steps to get a local copy of the project up and running.PrerequisitesYou need to have Node.js installed on your machine.InstallationClone the repository:git clone https://github.com/your-username/haunted-house.git
cd haunted-house
Install dependencies:npm install
Running LocallyTo start the development server and view the project in your browser, run the following command:npm run dev
Build for ProductionTo create an optimized build of your project for deployment, use:npm run build
The final output will be generated in the dist/ directory.Deployment on VercelThis project is configured for easy and reliable deployment on Vercel. The vercel.json file is crucial for correctly serving all project assets.vercel.json ConfigurationThe vercel.json file in this repository contains the necessary routing rules to ensure that all assets, including your compiled JavaScript files and your static models and textures, are served correctly without any errors.{
  "version": 2,
  "name": "Haunted House",
  "buildCommand": "chmod +x node_modules/.bin/vite && npm run build",
  "outputDirectory": "dist",
  "env": {
    "NODE_ENV": "production"
  },
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*\\.(?:glb|gltf|bin|png|jpg|jpeg|svg|css|js|json|mp3|wav|ogg))",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
This configuration prevents common deployment issues like "MIME type" and "SyntaxError" by ensuring all file types are served with the correct headers.I hope this helps you get your repository set up! It's a fantastic project, and I'm happy to help you document it.