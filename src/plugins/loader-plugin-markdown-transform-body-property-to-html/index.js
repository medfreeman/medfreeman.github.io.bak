/* eslint-disable import/max-dependencies */

import remarkPlugins from "./remark-plugins.js"

const mdify = (body) => remarkPlugins(children).contents

export default (
  {
    result,
  }: PhenomicLoaderPluginInput
): PhenomicCollectionItem => {
  return {
    ...result,
    body: mdify(result.body),
  }
}
