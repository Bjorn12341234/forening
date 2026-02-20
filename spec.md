████████████████████████████████████████████████████████████
NATURHÄNSYN.SE — FULL TEKNISK SETUP MED CLAUDE CODE + THREE.JS
Hosting: Hostup (cPanel Jupiter)
User: sxesv
Home: /home/sxesv
Webroot: /home/sxesv/public_html
Server IP: 185.113.11.31
Stack: Apache + PHP 8.x + MySQL 8.x
████████████████████████████████████████████████████████████

SECTION 1 — AKTIVERA SSH

1. cPanel → Security → SSH Access
2. Enable SSH
3. Manage SSH Keys
4. Generate New Key
   - RSA
   - 4096 bits
5. Authorize key

Download private key to your computer.

Connect from Linux Mint:

ssh sxesv@naturhansyn.se

If port needed:
ssh sxesv@naturhansyn.se -p 22

Confirm:
pwd
Should return:
/home/sxesv


SECTION 2 — WORDPRESS ROOT

cd public_html
ls

You must see:
wp-admin
wp-content
wp-includes

That is WordPress root.


SECTION 3 — BACKUP BEFORE TOUCHING ANYTHING

Inside cPanel:
Backup → Download Full Account Backup

OR via SSH:

cd ~
tar -czf backup_$(date +%F).tar.gz public_html


SECTION 4 — GIT ENABLED WORKFLOW (PROFESSIONAL SETUP)

Inside /home/sxesv:

mkdir projects
cd projects
mkdir naturhansyn-theme-dev
cd naturhansyn-theme-dev
git init

This is your Claude Code working directory.

You do NOT develop directly in live public_html.

You build theme here and then deploy.


SECTION 5 — CREATE CUSTOM WORDPRESS THEME

Structure:

naturhansyn-theme/
│
├── style.css
├── functions.php
├── index.php
├── header.php
├── footer.php
├── front-page.php
├── assets/
│   ├── css/
│   ├── js/
│   │   ├── three.module.js
│   │   └── scene.js
│   └── textures/
└── screenshot.png


style.css header must contain:

/*
Theme Name: Naturhänsyn Custom
Theme URI: https://naturhansyn.se
Author: Naturhänsyn
Version: 1.0
*/


SECTION 6 — ENQUEUE THREE.JS PROPERLY

functions.php:

function naturhansyn_enqueue_scripts() {

    wp_enqueue_script(
        'three-js',
        'https://unpkg.com/three@0.160.0/build/three.module.js',
        array(),
        null,
        true
    );

    wp_enqueue_script(
        'naturhansyn-scene',
        get_template_directory_uri() . '/assets/js/scene.js',
        array('three-js'),
        null,
        true
    );

}

add_action('wp_enqueue_scripts', 'naturhansyn_enqueue_scripts');


SECTION 7 — MINIMAL THREE.JS SCENE

assets/js/scene.js:

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x2f5d3a });
const plane = new THREE.Mesh(geometry, material);

scene.add(plane);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 10, 10);
scene.add(light);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    plane.rotation.x += 0.001;
    renderer.render(scene, camera);
}

animate();


SECTION 8 — DEPLOY THEME TO LIVE SITE

From SSH:

cd /home/sxesv/projects/naturhansyn-theme-dev
cp -r naturhansyn-theme /home/sxesv/public_html/wp-content/themes/

Then:

Login to:
https://naturhansyn.se/wp-admin

Appearance → Themes
Activate "Naturhänsyn Custom"


SECTION 9 — OPTIONAL ADVANCED ARCHITECTURE (HEADLESS MODE)

If you want proper modern frontend:

1. Keep WordPress as CMS only
2. Enable REST API
3. Build frontend separately using:

npm create vite@latest naturhansyn-frontend
cd naturhansyn-frontend
npm install three axios

4. Fetch content from:

https://naturhansyn.se/wp-json/wp/v2/pages

5. Deploy frontend as static build to:
public_html/app/

This isolates PHP from frontend completely.


SECTION 10 — SECURITY HARDENING

- Disable file editing in WP:
  Add to wp-config.php:

  define('DISALLOW_FILE_EDIT', true);

- Install Wordfence or equivalent
- Enable HTTPS redirect
- Turn on Cloudflare only after testing


SECTION 11 — CLAUDE CODE WORKFLOW

Inside your local clone or SSH session:

1. Claude edits theme files
2. Test in staging folder:
   /home/sxesv/staging/
3. Commit changes:

   git add .
   git commit -m "Add Three.js hero scene"

4. Deploy manually to live

Never develop directly in public_html without backup.


SECTION 12 — WHAT NOT TO DO

- Do NOT use Sitejet
- Do NOT modify WordPress core
- Do NOT install heavy visual builders if using Three.js
- Do NOT mix 3D canvas with random theme JS conflicts


FINAL STATE

You now have:

✓ SSH access
✓ Version controlled theme
✓ Custom Three.js integration
✓ Clean WordPress backend
✓ Safe deploy strategy
✓ Scalable architecture

████████████████████████████████████████████████████████████

If you want next level:
I can now give you a fully designed 3D forest hero scene concept tailored to Naturhänsyn’s mission.

Just say:
"Design the 3D experience."

---

I tried this but im not sure i will destory anything.
bjorn@bjorn:~$ ssh sxesv@185.113.11.31
The authenticity of host '185.113.11.31 (185.113.11.31)' can't be established.
ED25519 key fingerprint is SHA256:n6IAmKNFbtYm7YYHtKaiYHOdS2UmY3cf2f+KtIy9dQg.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? 

---

we need to make everything local first and commiting steps on the way so we can revert if needed. i dont want to destory the current site that my friend has. im helping her with the site to modernize it. all the current features. just better looking.

---

chat gpt said this.

OPTION 1 — Spegla hela WordPress lokalt

Via SSH:

scp -r sxesv@185.113.11.31:/home/sxesv/public_html ~/naturhansyn-live

Nu har du hela sajten lokalt.

Sedan:

cd ~/naturhansyn-live
git init
git add .
git commit -m "Initial backup of live site"

Nu kan du:

Ändra filer

Köra Claude Code i den mappen

Versionera allt

Deploy tillbaka:

scp -r * sxesv@185.113.11.31:/home/sxesv/public_html

Men detta är lite farligt om du inte är försiktig.

OPTION 2 — Rätt sätt (rekommenderat)

Du utvecklar ENDAST ett custom theme lokalt.

Du rör inte WordPress core.

Så här:

Ladda ner endast:
wp-content/themes/

Skapa nytt tema lokalt:
naturhansyn-theme/

Git-versionera bara temat.

Deploy endast temat till:

/wp-content/themes/

Det är säkrare.

Ja, Git gör att du kan revert

Exempel:

git log
git checkout <commit-id>

eller:

git revert HEAD

Så länge du inte deployar över allt slarvigt är du säker.

Extra säkerhet (mycket viktigt)

Innan du gör något:

I cPanel:

Backup → Download Full Account Backup

Detta är din fail-safe.

Vad jag rekommenderar för dig

Eftersom du vill använda Three.js och experimentera:

→ Bygg ett nytt tema lokalt
→ Git-versionera det
→ Deploya bara temat
→ Aktivera temat i WordPress

Det är säkert, rent och revertbart.

