const fs = require('fs');
const files = [
    'src/components/CreatePostAdmin.jsx',
    'src/components/ManagePosts.jsx',
    'src/pages/CreateBlog.jsx',
    'src/pages/Exlpore.jsx',
    'src/pages/Home.jsx',
    'src/pages/Login.jsx',
    'src/pages/PostDetails.jsx',
    'src/pages/Profile.jsx',
    'src/pages/Register.jsx'
];
for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/from "react-toastify"/g, 'from "sonner"');
        content = content.replace(/from 'react-toastify'/g, "from 'sonner'");
        fs.writeFileSync(file, content);
        console.log('Updated ' + file);
    } else {
        console.log('Not found ' + file);
    }
}
