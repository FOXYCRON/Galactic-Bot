const { readdirSync } = require('fs');
const path = require('path');

module.exports = (client) => {
    let eventCount = 0;
    const eventDir = path.join(__dirname, '../events');

    try {
        const eventFolders = readdirSync(eventDir);

        for (const eventFolder of eventFolders) {
            const eventPath = path.join(eventDir, eventFolder);
            const events = readdirSync(eventPath).filter(file => file.endsWith('.js'));

            for (const jsEvent of events) {
                try {
                    const filePath = path.join(eventPath, jsEvent);
                    delete require.cache[require.resolve(filePath)];
                    const EventClass = require(filePath);
                    const event = new EventClass(client);

                    if (typeof event.run !== 'function') {
                        throw new Error(`No se encontró la función run en ${jsEvent}`);
                    }

                    const eventName = jsEvent.split('.')[0];
                    client.on(eventName, (...args) => event.run(...args));
                    eventCount++;
                } catch (error) {
                    console.error(`❌ Error al cargar el evento ${jsEvent}:`, error);
                }
            }
        }

        console.log(`(+) ✅ ${eventCount} Eventos Cargados`.green);
    } catch (error) {
        console.error('❌ Error al leer la carpeta de eventos:', error);
    }
};
