## Local Setup

### Clone
```
git clone git@github.com:Zanna-ResearchTeam/Zanna-ResearchTeam.github.io.git
cd Zanna-ResearchTeam.github.io
```

### Install Hugo 
Follow the setup [here](https://gohugo.io/installation/)

### Local Run
```
hugo server -D
```

## Update Content
Replace or add new content based within the `content/` folder and verify changes using steps defined in `Local Setup`.

## Publish changes
Always make changes either in a new branch or a forked repository. Do not directly push or make changes to the `main` branch. Do not manually make changes to the `gh-pages` branch. Only the Github actions bot is supposed to publish content there.
```
git checkout -b <branch-name>
git add .
git commit -m "<commit message>"
git push origin <branch-name>
```

## Verfication
Make sure the build passes and somebody reviews your changes either live or as screenshots.