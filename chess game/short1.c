#include <stdio.h>

int main() {
    int arr[10], limit, i, j;
    int temp;
    int sorting;

    printf("Enter the limit of the array: ");
    scanf("%d", &limit);

    printf("Enter %d elements:\n", limit);
    for(i = 0; i < limit; i++) {
        scanf("%d", &arr[i]);
    }

    printf("\nArray before sorting:\n");
    for(i = 0; i < limit; i++) {
        printf("%d\t", arr[i]);
    }

    printf("\n\nIf you want to sort the elements press 1: ");
    scanf("%d", &sorting);

    if(sorting == 1) {
        for(i = 0; i < limit - 1; i++) {
            for(j = i + 1; j < limit; j++) {
                if(arr[i] > arr[j]) {
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }

        printf("\nArray after sorting (Ascending Order):\n");
        for(i = 0; i < limit; i++) {
            printf("%d\t", arr[i]);
        }
    }

    return 0;
}