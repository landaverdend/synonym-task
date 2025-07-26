
# Homework Assignment
Hello, to run this project, use the following commands:

```
npm install
npm run dev
```

To simulate offline mode, there is a toggle button at the top, alongside a 'clear cache' button that will clear out the local cache.


# Known Issues
- The loading CSS widget is a little buggy and causes some shifts in the layout of the page.
- The application won't manually set you to offline mode when the API call fails, (the toggle however works)
- The user card component is not mobile friendly
- No favoriting

# What I would improve with more time:

Given more time, I would clean up the CSS that isn't mobile friendly, as well as make things look a little prettier. I figured these were less important than getting a basic prototype working. Generally I make things pretty closer to the end of the project and focus on the behaviors at first.

I was also about to start the favoriting feature- I had some issues working with the Dexie API and typescript at start up that delayed me a little bit. The favorite's feature was a little vague, so I likely would ask for clarification. But I would have implemented it by adding a field to the `CachedUser` interface that I created for adding extra data to the API response objects (something like an isFavorited field). I would then add support for it and included some styling/indications on the UI side for favoriting/unfavoriting.

I would also have made the offline detection more robust, as of now, it's just a toggle. But really we would want to set users to offline mode after implementing some API-call retry strategy. 

In order, I would have done the following:
- added user favoriting
- add a robust retry strategy for api call failures
- clean up small CSS errors and make components more modular. (There are some duplicated buttons in `ListControls.tsx` that should be reused.)
