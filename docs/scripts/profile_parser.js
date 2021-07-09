
// Objects
const body = document.body;
const profile = document.querySelector('.profile>.image');
const root = document.querySelector(':root');
const links = document.querySelector('.links>.links');

let previous_background_url = '';

function generate() {

    // Background
    body.style.background = `url('${profile_data.images.background}')`;
    body.style.backgroundPosition = profile_data.images.background_offset ?? 'center';
    body.style.backgroundSize = profile_data.images.background_size ?? 'cover';

    // Avatar
    profile.style.background = `url('${profile_data.images.avatar}')`;
    profile.style.backgroundPosition = profile_data.images.avatar_offset ?? 'center';
    profile.style.backgroundSize = profile_data.images.avatar_size ?? 'cover';

    // Set Text
    document.querySelector('.text>h2').innerText = profile_data.title;
    document.querySelector('.text>h3').innerText = profile_data.subtitle;
    document.querySelector('.bio>p').innerText = profile_data.bio;
    document.querySelector('.pronouns>p').innerText = profile_data.pronouns;
    document.querySelector('.interests>p').innerText = profile_data.interests;

    // Links
    create_link = (text, link, icon, fa_section = 'fab') => {
        let item = document.createElement('li');
        links.appendChild(item);
        item.innerHTML = `<a href="${link}" target="__blank"><i class="${fa_section} fa-${icon}"></i> ${text}</a>`;
    }

    // Remove Previous Links
    while (links.firstChild) {
        links.firstChild.remove();
    }

    // Create New Links
    const { instagram, twitter, discord, pronouns } = profile_data.links;
    if (instagram) create_link(instagram, `https://instagram.com/${instagram}`, 'instagram');
    if (twitter) create_link(twitter, `https://twitter.com/${twitter}`, 'twitter');
    if (discord) create_link('.gg/' + discord, `https://discord.gg/${discord}`, 'discord');
    if (pronouns) create_link(pronouns, `https://en.pronouns.page/${pronouns}`, 'user', 'fas');

    // Set Colours
    if (previous_background_url !== profile_data.images.background) {
        
        previous_background_url = profile_data.images.background

        const loaded = () => {

            const swatch = new Vibrant(image).swatches();
            root.style.setProperty('--accent', swatch.Vibrant.getHex());
            root.style.setProperty('--secondary', swatch.Muted.getHex());

            setTimeout(() =>
                [...document.querySelectorAll('.xyz-target')].forEach(elem => {
                    elem.classList.remove('xyz-target');
                    elem.classList.add('xyz-in');
                }), 1000);

            document.querySelector('.profile').style.animationName = 'show-card'

        }

        let image = document.createElement('img');
        image.crossOrigin = 'anonymous';
        image.src = profile_data.images.background;
        image.style.visibility = 'hidden';
        image.onload = loaded;

    }


}

generate();