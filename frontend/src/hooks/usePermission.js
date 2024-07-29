export default function usePermission(session,keyName) {
    const allow = session?.permission?.some(p => p.key === keyName);
    return !!allow
}