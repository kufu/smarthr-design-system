import { Reel, TabBar, TabItem } from 'smarthr-ui';

export const TabBarWithReel = () => (
  <TabBar>
    <Reel>
      <TabItem id="tabitem1" onClick={() => null} selected>
        タブ1
      </TabItem>
      <TabItem id="tabitem2" onClick={() => null}>
        タブ2
      </TabItem>
      <TabItem id="tabitem3" onClick={() => null}>
        タブ3
      </TabItem>
      <TabItem id="tabitem4" onClick={() => null}>
        タブ4
      </TabItem>
      <TabItem id="tabitem5" onClick={() => null}>
        タブ5
      </TabItem>
    </Reel>
  </TabBar>
);
