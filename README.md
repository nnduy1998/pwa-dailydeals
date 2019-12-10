# simi-studio

This Project's purpose is to help any new developer create a new pwa-studio project based on Venia concept just via few simple steps. Following the guide below and then change "simi-studio" to your own project name after you reached the production running.

## 1. Clone pwa-studio
```
git clone https://github.com/magento-research/pwa-studio/
cd pwa-studio
git checkout release/4.0
```

## 2. Modify package.json

workspaces:
```

  "workspaces": [
...
    "packages/upward-spec",
    "packages/simi-studio"
  ],

```

scripts:

```
  "scripts": {
	...
    "watch:venia": "yarn workspace @magento/venia-concept run watch; cd - >/dev/null",
    "watch:simi-studio": "yarn workspace @magento/simi-studio run watch",
    "stage:simi-studio": "yarn workspace @magento/simi-studio run start"
  },
```
## 3. Clone simi-studio
```
cd  packages
git clone https://github.com/Simicart/simi-studio
cd ..
yarn install
yarn run build
```
## 4. Run watch/stage
To run watch
```
yarn run watch:simi-studio
```
To run production
```
NODE_ENV=production PORT=8080 npm run stage:simi-studio
```
