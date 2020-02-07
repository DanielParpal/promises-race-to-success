export async function promises() {

  const firstPromise: Promise<number> = new Promise((res, reject) => {
    setTimeout(() => res(1), 3000)
  });

  const secondPromise: Promise<number> = new Promise((res, rej) => {
    setTimeout(() => res(2), 5000)
  });

  const thirdPromise: Promise<number> = new Promise((res, reject) => {
    setTimeout(() => reject(3), 1000)
  }); 

  const promises: (Promise<number>)[] = [firstPromise, secondPromise, thirdPromise];

  const firstToSucceed = await raceToSuccess(promises);
  console.log('succeeded with', firstToSucceed);
}

const raceToSuccess = async (promises: (Promise<number>)[]) => {
  return new Promise((res) => {
    
    promises.forEach((p) => {
      p.then((val) => {
        res(val);
      }).catch((val) => {
        console.log(`successfully catched ${val}`);
      });
    });

  });

}