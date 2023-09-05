import { useAppContext } from "../App";

export const usePrivateIssueHelper = () => {
    const { providerPrivateData: providerData } = useAppContext();
    const hideIssue = (providerName: string, unique: boolean): boolean => {
        if(providerData && providerData.indexOf(providerName) !== -1) {
            return unique;
        }
        return false;
    }
    return { hideIssue }
}