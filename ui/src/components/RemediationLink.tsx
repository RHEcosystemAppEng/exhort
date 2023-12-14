import React, {useReducer} from 'react';
import {Button, ButtonVariant, Icon, Modal, ModalVariant} from '@patternfly/react-core';

import {extractDependencyName, extractDependencyUrl, extractDependencyVersion, tcRemediationLink} from '../utils/utils';
import SecurityCheckIcon from '../images/security-check.svg';

interface RemediationLinkProps {
  packageName: string | '';
  cves: string[];
}

export const RemediationLink: React.FC<RemediationLinkProps> = ({ packageName, cves }) => {
  // const appContext = useAppContext();

  // const [isModalOpen, toggleModal] = useReducer((state) => !state, false);

  return (
    <>
      <Icon isInline status="success">
          <img src={SecurityCheckIcon} alt="Security Check Icon" />
      </Icon>&nbsp;
      <a href={tcRemediationLink(packageName)} target="_blank" rel="noreferrer">
        {extractDependencyVersion(packageName)}
      </a>

      {/*<Button variant={ButtonVariant.link} onClick={toggleModal} style={{paddingLeft: "initial"}}>*/}
      {/*  <Icon isInline status="success">*/}
      {/*      <img src={SecurityCheckIcon} alt="Security Check Icon" />*/}
      {/*  </Icon>&nbsp;*/}
      {/*  {extractDependencyVersion(packageName)}*/}
      {/*</Button>*/}

      {/*<Modal*/}
      {/*  variant={ModalVariant.small}*/}
      {/*  title={extractDependencyVersion(packageName)}*/}
      {/*  isOpen={isModalOpen}*/}
      {/*  onClose={toggleModal}*/}
      {/*  actions={[*/}
      {/*    ...cves.map((cve) => (*/}
      {/*      <Button*/}
      {/*        key="confirm"*/}
      {/*        component="a"*/}
      {/*        target="_blank"*/}
      {/*        rel="noreferrer"*/}
      {/*        variant={ButtonVariant.secondary}*/}
      {/*        // href={`${appContext.vexPath}${cve}-Quarkus.json`}*/}
      {/*      >*/}
      {/*        VEX*/}
      {/*      </Button>*/}
      {/*    )),*/}
      {/*    <Button*/}
      {/*      key="cancel"*/}
      {/*      component="a"*/}
      {/*      target="_blank"*/}
      {/*      rel="noreferrer"*/}
      {/*      variant={ButtonVariant.secondary}*/}
      {/*      // href={appContext.sbomPath}*/}
      {/*    >*/}
      {/*      SBOM*/}
      {/*    </Button>,*/}
      {/*  ]}*/}
      {/*>*/}
      {/*  Click either VEX or SBOM to download the corresponding file type. You can also click the*/}
      {/*  package name to view more information in Red Hat's Maven repository.*/}
      {/*</Modal>*/}
    </>
  );
};
