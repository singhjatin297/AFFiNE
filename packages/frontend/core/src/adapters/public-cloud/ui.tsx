import { PageNotFoundError } from '@affine/env/constant';
import type { WorkspaceFlavour } from '@affine/env/workspace';
import { type WorkspaceUISchema } from '@affine/env/workspace';
import { initEmptyPage } from '@toeverything/infra/blocksuite';
import { useCallback } from 'react';

import { useWorkspace } from '../../hooks/use-workspace';
import { PageDetailEditor, Provider } from '../shared';

export const UI = {
  Provider,
  PageDetail: ({ currentWorkspaceId, currentPageId, onLoadEditor }) => {
    const workspace = useWorkspace(currentWorkspaceId);
    const page = workspace.blockSuiteWorkspace.getPage(currentPageId);
    if (!page) {
      throw new PageNotFoundError(workspace.blockSuiteWorkspace, currentPageId);
    }
    return (
      <>
        <PageDetailEditor
          pageId={currentPageId}
          onInit={useCallback(async page => initEmptyPage(page), [])}
          onLoad={onLoadEditor}
          workspace={workspace.blockSuiteWorkspace}
        />
      </>
    );
  },
  NewSettingsDetail: () => {
    throw new Error('Not implemented');
  },
} satisfies WorkspaceUISchema<WorkspaceFlavour.AFFINE_PUBLIC>;
