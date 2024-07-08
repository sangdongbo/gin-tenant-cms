const fetchStream = (url: string, options?: any, onMessage?: (response: any) => void) => {
  return new Promise<void>(async (resolve, reject) => {
    const { data, body, ...currentOptions} = options;
    const response: any = await fetch(url,
      {
        // method: 'POST',
        body: JSON.stringify(data) || JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'whHMKOHrgn90cRAFC75/6AmK+r0k12Hd02q6HAJVaaQSzpzBmeK1bUzQgBLPl9Hz',
          'X-Tenant': localStorage.getItem('lookstar-tenant-X-Tenant'),
        },
        ...currentOptions,
      });

    if (response.status < 200 || response.status >= 300) {
      // onError?.();
      reject();
      return;
    };

    const reader = response.body.getReader();
    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        // onDone?.();
        resolve();
        break;
      };
      onMessage?.(JSON.parse(new TextDecoder().decode(value)));
    };
  });
};

export default fetchStream;
