## Installation -- AWS Setup Instructions 
1. First, go to https://console.aws.amazon.com and follow the steps to create an account, a root account 
2. Then go to https://console.aws.amazon.com/s3 to setup the bucket for s3  uploader specifically 
3. Go to buckets and click on create bucket 
4. The bucket name can be anything but I did wonder-wander-bucket
5. When creating a bucket, for the region, it really doesn't matter what region just pick the one closest. Write down what region you picked because you will     need the region code later. For example, I chose the us east ohio region and the region code was us-east-2
6. Click next after the region
7. MAKE SURE TO CLICK OFF BLOCK ALL PUBLIC ACCESS
There is a checkbox that is defaulted to checked and leaving it checked will prevent the app from accessing the bucket 
8. At review, click create bucket to continue 
9. Once the bucket is created, we need to edit the permissions and the CORS configuration 
10. Click on the bucket and then click on permissions, and then click on CORS configuration for that bucket 
I included the code block below, just copy-paste it into the editor window:
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    },
    {
        "AllowedHeaders": [],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
Save the configuration
11. Go to https://console.aws.amazon.com/iam and click on groups to first create a group 
12. Click create new group and give it a name, click next step
13. At this next step, find and check the AmazonS3FullAccess policy, then click next step
14. Then click create group 
15. Now click on the user tab the add a user
16. Give the new user a name, make sure to check programmatic access
17. Skip adding any tags and then create new user
18. You are brought to a screen with an access key ID and a secret access key, you will need BOTH
19. Copy the access key id to the AWS_ACCESS_KEY_ID line of the .env file in the source code 
20. Click show to see the secret access key and the copy it to the AWS_SECRET_ACCESS_KEY line of the .env file in the source code 
21. Save the .env file 
22. After doing that, go the policies tab and click create policy 
23. For services, find and click on S3, check all S3 actions
24. Under the resources section, check any for all the options, then click review policy 
25. Give policy name, and then click create policy 
At this point, the app is now set to work with the created bucket 