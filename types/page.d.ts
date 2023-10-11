declare interface IPageProps<T = {}> {
  params: T;
  searchParams: Record<string, string | undefined>;
}

declare interface API_Params<T = {}> {
  params: T;
}
