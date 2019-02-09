import path from 'path';

let p = {}

p.root = path.resolve(__dirname, '..');
p.module = path.resolve(__dirname, 'module');
p.scripts = path.resolve(__dirname, 'scripts');
p.dist = path.resolve(__dirname, 'dist');
p.publish = path.resolve(__dirname, 'publish');

export default p;