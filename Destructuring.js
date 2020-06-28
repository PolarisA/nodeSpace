function f({ a = 0, b = 0 } = {}) {
    return a + b
}

for (let i = 0; i < 1e8; i++) {
    const d = f({ a: 1, b: 2 })
};
