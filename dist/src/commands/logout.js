import Configstore from 'configstore';
const config = new Configstore('gutensight-seo');
export function logout() {
    try {
        config.delete('apiKey');
        console.log('✅ Logged out successfully.');
    }
    catch (error) {
        console.error('❌ Error during logout:', error.message);
    }
}
//# sourceMappingURL=logout.js.map