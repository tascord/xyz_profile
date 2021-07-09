// Base profile data
let profile_data = {
    title: 'tascord',
    subtitle: 'programmer • video game enthusiast • woeful humor enjoyer',
    bio: 'I do nothing but sit around making woefully written but good locking things in questionable programming languages.',
    pronouns: 'they/them/theirs/themselves',
    interests: 'programming, music, video games, big words, opulence, tea, energy drinks, pretty things, soft things, warm things',
    links: {
        instagram: 'tascord',
        twitter: 'tascord',
        discord: 'buzz',
        pronouns: 'tascord'
    },
    images: {
        // background: 'https://source.unsplash.com/1920x1080/?aesthetic',
        background: "images/background.jpg",
        background_offset: 'center',
        avatar: 'https://avatars.githubusercontent.com/u/35181375?v=4',
        avatar_offset: 'center',
        avatar_size: '150%'
    }
}

// Import CSS
const css = document.createElement('link');
document.head.appendChild(css);
css.type = "text/css";
css.rel = "stylesheet";
css.href = 'style/customizer.css';

// Import HTML
let customizer = document.createElement('div');
document.body.appendChild(customizer);
customizer.outerHTML = `
<div class="customizer">

<h3>Title</h3>
<input type="text" id="title" placeholder="Username">

<h3>Subtitle</h3>
<textarea id="subtitle" placeholder="Subtitle"></textarea>

<h3>Bio</h3>
<textarea id="bio" placeholder="Bio"></textarea>

<h3>Pronouns</h3>
<textarea id="pronouns" placeholder="Pronouns"></textarea>

<h3>Interests</h3>
<textarea id="interests" placeholder="Interests"></textarea>

<h3>Background Image URL</h3>
<input type="url" id="backgroundImage" placeholder="Background Image">

<h3>Background Size</h3>
<input type="range" id="backgroundSize" min="0" max="200" step="1">

<h3>Background Offsets</h3>
<input type="range" id="backgroundOffsetX" min="-100" max="100" step="1">
<input type="range" id="backgroundOffsetY" min="-100" max="100" step="1">

<h3>Avatar Image URL</h3>
<input type="url" id="avatarImage" placeholder="Avatar Image">

<h3>Avatar Size</h3>
<input type="range" id="avatarSize" min="0" max="200" step="1">

<h3>Avatar Offsets</h3>
<input type="range" id="avatarOffsetX" min="-100" max="100" step="1">
<input type="range" id="avatarOffsetY" min="-100" max="100" step="1">

<h3>Instagram Username</h3>
<input type="text" id="instagram" placeholder="Instagram Username">

<h3>Twitter Username</h3>
<input type="text" id="twitter" placeholder="Twitter Username">

<h3>Discord Invite Code</h3>
<input type="text" id="discord" placeholder="Discord Invite">

<h3>en.pronouns.page Username</h3>
<input type="text" id="pronounsPage" placeholder="Pronouns Page Username">

<br>

<button onclick="import_data()">Import JSON Data</button>
<button onclick="copy_data()">Copy JSON Data</button>
<h3 id="message"></h3>


</div>`;

const handler = (id, field, subfield = false, format = '%s') => {

    const element = document.getElementById(id);

    element.onchange =
        element.onkeyup =
        (event) => {

            let value = format.replace('%s', event.target.value);

            if (subfield) profile_data[field][subfield] = value;
            else profile_data[field] = value;

            generate();

        }
}

const xy_handler = (id, field, subfield, x) => {

    const element = document.getElementById(id);
    element.onchange = (event) => {

        let data = profile_data[field][subfield].split(' ');
        if (data.length === 1) data.push(data[0]);

        if (x) data[0] = event.target.value + '%';
        else data[1] = event.target.value + '%';

        profile_data[field][subfield] = data.join(' ');

        generate();
    }

}

const get_xy = (data) => {

    let [x, y] = profile_data.images.background_offset.split(' ');
    if (!y) y = 'center';

    if (x === 'center') x = '0%';
    if (y === 'center') y = '0%';

    if (!x.endsWith('%')) x = '0%';
    if (!x.endsWith('%')) x = '0%';

    return [x, y];

}

// Register Handlers
handler('title', 'title');
handler('subtitle', 'subtitle');
handler('bio', 'bio');
handler('pronouns', 'pronouns');
handler('interests', 'interests');

handler('backgroundImage', 'images', 'background');
handler('backgroundSize', 'images', 'background_size', '%s%')
xy_handler('backgroundOffsetX', 'images', 'background_offset', true);
xy_handler('backgroundOffsetY', 'images', 'background_offset', false);

handler('avatarImage', 'images', 'avatar');
handler('avatarSize', 'images', 'avatar_size', '%s%')
xy_handler('avatarOffsetX', 'images', 'avatar_offset', true);
xy_handler('avatarOffsetY', 'images', 'avatar_offset', false);

handler('instagram', 'links', 'instagram');
handler('twitter', 'links', 'twitter');
handler('discord', 'links', 'discord');
handler('pronounsPage', 'links', 'pronouns');


// Populate Fields
const populate = () => {

    document.getElementById('title').value = profile_data.title ?? '';
    document.getElementById('subtitle').value = profile_data.subtitle ?? '';
    document.getElementById('bio').value = profile_data.bio ?? '';
    document.getElementById('pronouns').value = profile_data.pronouns ?? '';
    document.getElementById('interests').value = profile_data.interests ?? '';
    document.getElementById('backgroundImage').value = profile_data.images.background ?? '';
    document.getElementById('avatarImage').value = profile_data.images.avatar ?? '';

    let [b_x, b_y] = get_xy(profile_data.images.background_offset ?? 'center');
    document.getElementById('backgroundOffsetX').value = b_x.slice(0, -1);
    document.getElementById('backgroundOffsetY').value = b_y.slice(0, -1);

    let [a_x, a_y] = get_xy(profile_data.images.avatar_offset ?? 'center');
    document.getElementById('avatarOffsetX').value = a_x.slice(0, -1);
    document.getElementById('avatarOffsetY').value = a_y.slice(0, -1);

    document.getElementById('avatarSize').value = (profile_data.images.avatar_size ?? '100%').slice(0, -1);
    document.getElementById('backgroundSize').value = (profile_data.images.background_size ?? '100%').slice(0, -1);

    document.getElementById('instagram').value = profile_data.links.instagram ?? '';
    document.getElementById('twitter').value = profile_data.links.twitter ?? '';
    document.getElementById('discord').value = profile_data.links.discord ?? '';
    document.getElementById('pronounsPage').value = profile_data.links.pronouns ?? '';


}

// Initial call
populate();

// Copy data
let copy_timer = null;
const copy_data = () => {

    navigator.clipboard.writeText(`const profile_data = ` + JSON.stringify(profile_data, null, 4))
        .then(() => {

            document.getElementById('message').innerText = 'Copied!';
            if (copy_timer) clearTimeout(copy_timer);
            copy_timer = setTimeout(() => {
                document.getElementById('message').innerText = '';
            }, 1000)

        })
        .catch((error) => {

            console.log(`Error copying:`, error);
            console.log(`Profile data: `, `const profile_data = ` + JSON.stringify(profile_data, null, 4));

            document.getElementById('message').innerText = 'Error! Check console.';
            if (copy_timer) clearTimeout(copy_timer);
            copy_timer = setTimeout(() => {
                document.getElementById('message').innerText = '';
            }, 1000)

        });

};

const import_data = () => {

    const data = prompt('Please provide profile_data JSON here (without the \'const profile_data =\')');
    let json;

    try {
        json = JSON.parse(data);
        profile_data = json;

        populate();
        generate();
    }

    catch {
        alert('Unable to pass data. Invalid JSON.')
    }

}