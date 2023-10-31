import React from 'react';
import {FlexItem, Icon} from '@patternfly/react-core';
import {TransitiveDependency, Vulnerability} from '../api/report';
import SecurityIcon from "@patternfly/react-icons/dist/esm/icons/security-icon";

export const VulnerabilitiesCountBySeverity = ({
                                                   vulnerabilities = [],
                                                   transitiveDependencies = [],
                                               }: {
    vulnerabilities?: Vulnerability[];
    transitiveDependencies?: TransitiveDependency[];
}) => {

    const severityCounts = {
        CRITICAL: 0,
        HIGH: 0,
        MEDIUM: 0,
        LOW: 0,
    };
    if (vulnerabilities.length > 0) {
        // Loop through the issues and increment severity counts
        vulnerabilities.forEach((issue) => {
            const severity = issue.severity;
            // Increment the corresponding severity count
            if (severityCounts.hasOwnProperty(severity)) {
                severityCounts[severity]++;
            }
        });
    } else {
        transitiveDependencies?.forEach((dependency) => {
            dependency.issues?.forEach((issue) => {
                const severity = issue.severity;
                // Increment the corresponding severity count
                if (severityCounts.hasOwnProperty(severity)) {
                    severityCounts[severity]++;
                }
            });
        });
    }

    return (
        <FlexItem>
            {severityCounts.CRITICAL > 0 && (
                <>
                    <Icon isInline>
                        <SecurityIcon style={{fill: '#A30000', height: '13px'}}/>
                    </Icon>&nbsp;
                    {severityCounts.CRITICAL}&nbsp;
                </>
            )}
            {severityCounts.HIGH > 0 && (
                <>
                    <Icon isInline>
                        <SecurityIcon style={{fill: '#C9190B', height: '13px'}}/>
                    </Icon>&nbsp;
                    {severityCounts.HIGH}&nbsp;
                </>
            )}
            {severityCounts.MEDIUM > 0 && (
                <>
                    <Icon isInline>
                        <SecurityIcon style={{fill: '#ef9234', height: '13px'}}/>
                    </Icon>&nbsp;
                    {severityCounts.MEDIUM}&nbsp;
                </>
            )}
            {severityCounts.LOW > 0 && (
                <>
                    <Icon isInline>
                        <SecurityIcon style={{fill: '#f6d173', height: '13px'}}/>
                    </Icon>&nbsp;
                    {severityCounts.LOW}
                </>
            )}
        </FlexItem>
    );
};
