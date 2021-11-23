import boto3

client = boto3.resource("ec2", region_name="us-east-1")

startupscript = open(
    r"D:\Semesters\sem5\cloud computing IT Workshop III labs\script.sh", "r"
)
bucketFiles = startupscript.read()

Myinstances = client.create_instances(
    BlockDeviceMappings=[
        {
            "DeviceName": "/dev/xvda",
            "Ebs": {"DeleteOnTermination": True, "VolumeSize": 8, "VolumeType": "gp2"},
        },
    ],
    ImageId="ami-0c2b8ca1dad447f8a",
    InstanceType="t2.micro",
    KeyName="CS351-CG31-KP",
    MaxCount=1,
    MinCount=1,
    Monitoring={"Enabled": False},
    SecurityGroupIds=[
        "sg-088384690e64340a7",
    ],
    UserData=bucketFiles,
)
instance = Myinstances[0]
print("New instance of EC2 has been created", instance.id)
print(instance)
instance.wait_until_running()
print("running state")
print(client.Instance(instance.id).public_dns_name)
