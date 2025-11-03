const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataPath = path.join(__dirname, 'data.js');
const templatePath = path.join(__dirname, 'index.html');
const outputPath = path.join(__dirname, 'index.html');

function build() {
    console.log('Building static HTML...');
    try {
        const dataFileContent = fs.readFileSync(dataPath, 'utf8');

        const match = dataFileContent.match(/(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*\[/);
        if (!match || !match[1]) {
            throw new Error("Could not find an array variable declaration (e.g., 'const songs = [...]') in data.js");
        }
        const arrayVariableName = match[1];
        console.log(`Found array variable: ${arrayVariableName}`);

        // Replace const/let with var to ensure the variable is attached to the VM context's global scope
        const executableScript = dataFileContent.replace(/^(const|let)/, 'var');

        const context = { module: {}, exports: {} };
        vm.createContext(context);
        vm.runInContext(executableScript, context);

        const songs = context[arrayVariableName];

        if (!songs || !Array.isArray(songs)) {
            throw new Error(`Variable '${arrayVariableName}' was found, but it is not an array. Check data.js.`);
        }

        const songRowsHtml = songs.slice(0, 300).map((song, index) => {
            // The rank from the data.js file is used directly if available, otherwise fallback to index
            const rank = song.rank || index + 1;
            return `
            <div class="row" itemscope itemtype="http://schema.org/MusicRecording">
                <meta itemprop="url" content="https://open.spotify.com/intl-de/track/${song.spotifyID}" />
                <span itemprop="position">${rank}.</span>
                <a href="https://open.spotify.com/intl-de/track/${song.spotifyID}" target="_blank" rel="noopener noreferrer">
                    <img class="song-cover" itemprop="image" src="${song.imageUrl}" alt="${song.title} cover" loading="lazy">
                </a>
                <div class="song-details">
                    <span itemprop="byArtist" itemscope itemtype="http://schema.org/Person"><span itemprop="name">${song.artist}</span></span>
                    <span class="song" itemprop="name">${song.title}</span>
                </div>
                <span class="year-box" itemprop="datePublished">${song.year}</span>
            </div>`;
        }).join('\n');

        const templateContent = fs.readFileSync(templatePath, 'utf8');
        const finalHtml = templateContent.replace(
            /(<div id="ranking-table-body">)[\s\S]*(<\/div>)/,
            `$1${songRowsHtml}$2`
        );

        fs.writeFileSync(outputPath, finalHtml, 'utf8');
        console.log('Successfully generated static HTML in 80s.html');

    } catch (error) {
        console.error('Error during build process:', error);
    }
}

const shouldWatch = process.argv.includes('--watch');

build();

if (shouldWatch) {
    console.log(`Watching for changes in ${path.basename(dataPath)}...`);
    fs.watch(dataPath, (eventType, filename) => {
        if (filename) {
            console.log(`${filename} changed, rebuilding...`);
            build();
        }
    });
}