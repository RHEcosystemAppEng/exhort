import React, { useReducer } from 'react';
import { Button, ButtonVariant, Icon, Modal, ModalVariant } from '@patternfly/react-core';
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';

import { extractDependencyVersion } from '../utils/utils';
import { useAppContext } from '../App';

interface RemediationLinkProps {
  packageName: string;
  cves: string[];
}

export const RemediationLink: React.FC<RemediationLinkProps> = ({ packageName, cves }) => {
  const appContext = useAppContext();

  const [isModalOpen, toggleModal] = useReducer((state) => !state, false);

  return (
    <>
      <Button variant={ButtonVariant.link} onClick={toggleModal}>
        <Icon isInline status="success">
          <CheckCircleIcon />
        </Icon>{' '}
        {extractDependencyVersion(packageName)}
      </Button>

      <Modal
        variant={ModalVariant.small}
        title={extractDependencyVersion(packageName)}
        isOpen={isModalOpen}
        onClose={toggleModal}
        actions={[
          ...cves.map((cve) => (
            <Button
              key="confirm"
              component="a"
              target="_blank"
              rel="noreferrer"
              variant={ButtonVariant.secondary}
              href={`${appContext.vexPath}${cve}-Quarkus.json`}
            >
              VEX
            </Button>
          )),
          <Button
            key="cancel"
            component="a"
            target="_blank"
            rel="noreferrer"
            variant={ButtonVariant.secondary}
            href={appContext.sbomPath}
          >
            SBOM
          </Button>,
        ]}
      >
        Click either VEX or SBOM to download the corresponding file type. You can also click the
        package name to view more information in Red Hat's Maven repository.
      </Modal>
    </>
  );
};
