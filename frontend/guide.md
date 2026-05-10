1/ Download nodejs environment
2/ clone the project to your local computer
3/ cd frontend
4/ npm install (to install all the dependencies in package.json)
5/ after all dependencies have been installed, run ```npm run dev```
6/ the terminal will say running at localhost... -> open it

***for Docker.dev***

``` cd frontend ```

# Build

```docker build -t smarthome-dev -f Dockerfile.dev .```

# Run

```docker run -p 5173:5173 -v $(pwd):/app smarthome-dev```
