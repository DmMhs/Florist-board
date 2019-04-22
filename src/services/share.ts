export const shareOverrideOGMeta = (
  overrideLink: string,
  overrideTitle: string,
  overrideDescription: string,
  overrideImage: string
) => {
  console.log(overrideLink, overrideTitle, overrideDescription, overrideImage);
  const params: fb.ShareOpenGraphDialogParams = {
    method: 'share_open_graph',
    action_type: 'og.likes',
    action_properties: JSON.stringify({
      object: {
        'og:url': overrideLink,
        'og:title': overrideTitle.toUpperCase(),
        'og:description': overrideDescription,
        'og:image': overrideImage
      }
    }) as any,
    href: overrideLink
  };

  FB.ui(params, (response: any) => {
    console.log(response);
  });
};
