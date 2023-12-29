Local setup:
1) clone the repository
2)Download all dependencies by command 'npm install' in the client and server directory.
3) Replace the line const s = socketIO.connect("https://p2pserver-zrex.onrender.com");
 at meetingpage.jsx component with const s=socketIo.connect("http://localhost:3001")
4)Now run "node index.js" in server directory and "npm run dev" in client directory.
5)The app will be live at localhost:5173

I am facing a issue in this app, that audio is going to another user, please solve this issue if you know how to solve it, I have also opened an issue, you can solve it
and i will merge it, if it works.
