/**
 * Removes annoying requestAnimationFrame warning from jest test output
 */
(global as any).requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};