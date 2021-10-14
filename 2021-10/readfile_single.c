
#include <stdio.h>
// #include<io.h>
#include <fcntl.h>
#include <stdlib.h>
#include <time.h>

int calcCount(int start, unsigned long chunkLen);


int main()
{

  calcCount(0, 90000000L);
  // 最后要计算连接处
  return 0;
}


int calcCount(int start, unsigned long chunkLen) {
  clock_t startTime = clock();
  double diff_time;
  clock_t end;

  int len = 0;
  int count = 0;
  unsigned char *ansA = "HELLO JD";
  unsigned char *ansB = "JD WORLD";
  u_int64_t p1 = *(u_int64_t *)ansA;
  u_int64_t p2 = *(u_int64_t *)ansB;
  
  // HELLO JD WORLD
  
  int fd = open("./res_unsync/demo_200_499921.txt", O_RDONLY);
  if (fd == -1)
  {
    printf("can not open the file\n");
    return 0;
  }
  const BuffSize = 5120000;
  unsigned char buf[BuffSize] = {"\0"};
  lseek(fd, start, SEEK_SET);

  unsigned long readSize = 0;
  // printf("chunkLen=%ld, readSize=%ld\n", chunkLen, readSize);
  while ((len = read(fd, buf, BuffSize + readSize > chunkLen ? chunkLen - readSize : BuffSize)) && readSize < chunkLen)
  {
    // printf("%s\nlen=%d\n", buf, len);
    // printf("readSize: %ld\n", readSize);
    
    readSize += len;
    len = len - 13;
    for (int i = 0; i < len; i++) {
      if (*(buf + i + 6) > 'W' || *(buf + i + 13) > 'W') {
        i += 13;
        continue;
      }
      if (*(u_int64_t *)(buf + i) == p1 && *(u_int64_t *)(buf + i + 6) == p2) {
        // printf("%s\n i=%d\n", (buf + i), i);
        count++;
        i += 13;
      }
    }
    
  }
  close(fd);

  printf("worldCount=%d\n", count);

  end = clock();

  diff_time = (double)((end - startTime) / 1000);

  // diff_time = (double)((end-start)/CLOCKS_PER_SEC ) 获得进程自身的运行时间

  printf("start=%d, 用时:%f ", start, diff_time);
  return count;
}


