var MemoryService = /** @class */ (function () {
    function MemoryService() {
        this.store = {};
    }
    MemoryService.prototype.setItem = function (key, value) {
        this.store[key] = value;
    };
    MemoryService.prototype.getItem = function (key) {
        if (this.store[key]) {
            return this.store[key];
        }
        return null;
    };
    MemoryService.prototype.removeItem = function (key) {
        if (this.store[key]) {
            delete this.store[key];
        }
    };
    return MemoryService;
}());
export { MemoryService };
